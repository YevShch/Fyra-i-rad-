import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import Network from './helpers/Network.js';
import sleep from './helpers/sleep.js';
import generateCode from './helpers/generateCode.js';
import createConfetti from './helpers/createConfetti.js';

export default class App {
  constructor ( playerRed, playerYellow, whoStarts = 'red', myColor, networkPlay ) {
    try {
      // network related properties
      this.networkPlay = networkPlay;
      this.myColor = myColor; // note: only used in network play 

      this.dialog = new Dialog();
      this.board = new Board( this ); // Always create a new Board instance
      this.board.currentPlayerColor = whoStarts;
      this.whoStarts = whoStarts;
      this.setPlayAgainGlobals();

      // If players are passed into the constructor, set them directly
      if ( playerRed && playerYellow ) {
        this.playerRed = playerRed;
        this.playerYellow = playerYellow;
        // update players so that they know about the new board
        this.playerRed.board = this.board;
        this.playerYellow.board = this.board;
        // start the new game
        this.namesEntered = true;
        this.board.initiateBotMove();
        // if network play, then replace the listener 
        // (that belongs to the old app / game) with a new one
        if ( networkPlay ) {
          Network.replaceListener( obj => this.networkListener( obj ) );
        }
      } else {
        // enter new players
        this.askForNamesAndTypes();
      }
      this.render();

    } catch ( error ) {
      console.error( 'Error during game initialization:', error );
      this.displayErrorMessage( 'An error occurred during the game initialization. Please reload the page.' );
    }
  }


  async askIfNetworkPlay () {
    this.networkPlay = ( await this.dialog.ask(
      `Network Play: Do you want to play<br>against a friend via the Internet?`, [ 'Yes', 'No' ] ) ) === 'Yes';
    await sleep( 500 );
    if ( !this.networkPlay ) { return; }
    let startNetworkPlay = ( await this.dialog.ask(
      'Do you want to create a new network game? Or join one?', [ 'Create', 'Join' ] ) ) === 'Create';
    await sleep( 500 );
    let name = await this.dialog.ask( 'Enter your name:' );
    await sleep( 500 );
    if ( startNetworkPlay ) {
      this.myColor = 'red';
      let code = generateCode();
      Network.startConnection( name, code, obj => this.networkListener( obj ) );
      let extra = '';
      while ( !this.bothNetworkPlayersHasJoined ) {
        await this.dialog.ask(
          `Send the following join code to your friend:<br>
          <input type="text" name="joinCode" readonly value="${ code }">${ extra }`, [ 'OK' ] );
        extra = '<br>Waiting for your friend to join...'
        await sleep( 500 );
      }
    }
    else {
      this.myColor = 'yellow';
      let extra = '';
      while ( !this.bothNetworkPlayersHasJoined ) {
        let code = await this.dialog.ask( `Enter a the join code you got from your friend:${ extra }` );
        this.joiners = [];
        this.enteredJoinCode = code;
        Network.startConnection( name, code, obj => this.networkListener( obj ) );
        extra = '<br>Incorrect join code... Try again...';
        await sleep( 500 );
      }
    }
    // create players
    this.playerRed = new Player( this.joiners.shift(), 'Human', 'red', this.board );
    this.playerYellow = new Player( this.joiners.shift(), 'Human', 'yellow', this.board );
    this.namesEntered = true;
    this.render();
  }

  networkListener ( { user, timestamp, data } ) {
    // keep this console.log until you understand how 
    // and which network messages are sent
    console.log( user, timestamp, data );

    // wait for both players to join
    this.joiners = this.joiners || [];
    if ( user === 'system' && data.includes( 'joined channel' ) ) {
      this.joiners.push( data.split( ' ' )[ 1 ] );
      this.bothNetworkPlayersHasJoined = this.joiners.length >= 2;
    }

    // remove dialog/modal for player X when player O has joined
    if ( this.myColor === 'red'
      && this.bothNetworkPlayersHasJoined
      && document.querySelector( 'dialog input[name="joinCode"]' )
    ) {
      let okButton = document.querySelector( 'dialog .button.OK' );
      okButton && okButton.click();
    }

    // make move sent to us from opponent via the network
    if ( data.color && data.color !== this.myColor ) {
      let { color, column } = data;
      this.board.makeMove( color, column, false ) && this.render();
    }

    // if playAgain sent to player O from player X, playAgain
    if ( this.myColor === 'yellow' && data.action === 'playAgain' ) {
      globalThis.playAgain();
    }
  }


  async askForNamesAndTypes ( color = 'red' ) {
    try {
      color === 'red' && await this.askIfNetworkPlay();
      if ( this.networkPlay ) { return; }
      const okName = name => name.match( /[a-zåäöA-ZÅÄÖ]{2,}/ );
      let playerName = '';
      let playerType = '';
      // Request the player's name until it is valid
      while ( !okName( playerName ) ) {
        const promptHtml = `
          <div class="prompt-text">Enter the name of player ${ this.generateColorCircle( color ) }:</div>
        `;
        playerName = await this.dialog.ask( promptHtml );
        if ( !this.networkPlay ) {
          await sleep( 500 );
          playerType = await this.dialog.ask(
            `Which type of player is ${ playerName }?`,
            [ 'Human', 'A dumb bot', 'A smart bot' ]
          )
        }
        else {
          playerType = 'Human';
        }
      }

      // Create a player object
      this[ `player${ color.charAt( 0 ).toUpperCase() + color.slice( 1 ) }` ] = new Player( playerName, playerType, color, this.board );
      console.log( `Created ${ color } player: ${ playerName }` );

      // If the red player's name is entered, prompt for the yellow player's name
      if ( color === 'red' && !this.networkPlay ) { this.askForNamesAndTypes( 'yellow' ); return; }
     
        // Once both names are entered, set the flag and re-render 
        this.namesEntered = true;
        this.render();  // Re-render with names and player details
        this.board.initiateBotMove();
      
    } catch ( error ) {
      console.error( 'Error during name entry:', error );
      this.displayErrorMessage( 'An error occurred while entering player names. Please try again.' );
    }
  }

  namePossessive ( name ) {
    // Possessive form of name (handles names ending with "s" properly)
    return name + ( name.slice( -1 ).toLowerCase() !== 's' ? `'s` : `'` );
  }

  render () {
    try {
      let color = this.board.currentPlayerColor;
      let player = color === 'red' ? this.playerRed : this.playerYellow;
      let name = player?.name || '';

      document.querySelector( 'main' ).innerHTML = /*html*/`
       <h1>
       <span class="red-text">Connect</span> <span class="yellow-text">Four</span>
        </h1>
        ${ !this.board.gameOver && player ?
          `<p>
          <span class="player-info">
            <span class="circle-container">${ this.generateColorCircle( color ) }</span>
            <span class="player-name">${ this.namePossessive( name ) } turn...</span>
          </span>
        </p>` :
          ( this.namesEntered ? '' : '<p>Waiting for player names...</p>' ) }
        ${ !this.board.gameOver ? '' : /*html*/`
          ${ !this.board.isADraw ? '' : `<p>It's a tie...</p>` }
          ${ !this.board.winner ? '' : `<p>
    <span class="player-info">
      <span class="circle-container">${ this.generateColorCircle( color ) }</span>
      <span class="player-name">${ name } won!</span>
    </span>
  </p>` }
        `}
        ${ this.board.render() }
        <div class="buttons">
          ${ !this.board.gameOver ?
          this.renderQuitButton() :
          this.renderPlayAgainButtons() }
        </div>
      `;

      if ( this.networkPlay && this.myColor !== this.board.currentPlayerColor ) {
        document.body.classList.add( 'notMyTurn' );
      }
      else {
        document.body.classList.remove( 'notMyTurn' );
      }

      // Create confetti if the game is over and there's a winner
      if ( this.board.gameOver && this.board.winner ) {
        createConfetti();
      }
    } catch ( error ) {
      console.error( 'Error during rendering:', error );
      this.displayErrorMessage( 'An error occurred while rendering the game. Please try again.' );
    }
  }

  renderQuitButton () {
    try {
      if ( !this.namesEntered ) { return ''; }

      // don't show button for the joining player during network play
      if ( this.networkPlay && this.myColor === "O" ) { return ''; }

      globalThis.quitGame = async () => {
        let answer = await this.dialog.ask( 'What do you want to do?',
          [ 'Continue', 'Replay', 'New game' ] );
        if ( answer === 'Replay' ) globalThis.playAgain();
        if ( answer === 'New game' ) globalThis.newPlayers();
      };
    } catch ( error ) {
      console.error( 'Error during quit game dialog:', error );
      this.displayErrorMessage( 'An error occurred while quitting the game. Please try again.' );
    }

    return /*html*/`
      <div class="button" onclick="quitGame()">Quit this game</div>
    `;
  }

  setPlayAgainGlobals () {
    // play again 
    globalThis.playAgain = async () => {
      // Ensure that the board and state are fully reset before starting a new game
      let playerToStart = this.whoStarts === 'red' ? this.playerYellow : this.playerRed;
      // if network  and player X, then send 'playAgain' to player O
      if ( this.networkPlay && this.myColor === 'red' ) {
        Network.send( { action: 'playAgain' } );
      }
      new App( this.playerRed, this.playerYellow, playerToStart.color,
        this.myColor, this.networkPlay );
    }

    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons () {

    // don't show buttons for the joining player during network play
    if ( this.networkPlay && this.myColor === 'yellow' ) { return ''; }

    return /*html*/`
      <div class="button" onclick="playAgain()">Replay</div>
      <div class="button" onclick="newPlayers()">New game</div>
    `;
  }

  displayErrorMessage ( message ) {
    const errorContainer = document.createElement( 'div' );
    errorContainer.style.color = 'red';
    errorContainer.textContent = message;
    document.body.appendChild( errorContainer );
  }

  generateColorCircle ( color ) {
    const colorClass = color === 'red' ? 'red-circle' : 'yellow-circle';
    return `<div class="color-circle ${ colorClass }"></div>`;
  }

}
