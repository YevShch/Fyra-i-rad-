import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';
import createConfetti from './helpers/createConfetti.js';

export default class App {
  constructor ( playerRed, playerYellow, whoStarts = 'red' ) {
    try {
      this.dialog = new Dialog();
      this.board = new Board( this ); // Always create a new Board instance
      this.board.currentPlayerColor = whoStarts;
      this.whoStarts = whoStarts;
      this.setPlayAgainGlobals();

      // If players are passed into the constructor, set them directly
      if ( playerRed && playerYellow ) {
        this.playerRed = playerRed;
        this.playerYellow = playerYellow;
        this.namesEntered = true;
        this.board.initiateBotMove();
        console.log( 'Constructor: playerRed and playerYellow set directly' );
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

  async askForNamesAndTypes ( color = 'red' ) {
    try {
      const okName = name => name.match( /[a-zåäöA-ZÅÄÖ]{2,}/ );
      let playerName = '';
      let playerType = '';
      // Request the player's name until it is valid
      while ( !okName( playerName ) ) {
        const promptHtml = `
          <div class="prompt-text">Enter the name of player ${ this.generateColorCircle( color ) }:</div>
        `;
        playerName = await this.dialog.ask( promptHtml );
        await sleep( 500 );
        playerType = await this.dialog.ask(
          `Which type of player is ${ playerName }?`,
          [ 'Human', 'A dumb bot', 'A smart bot' ]
        )
      }

      // Create a player object
      this[ `player${ color.charAt( 0 ).toUpperCase() + color.slice( 1 ) }` ] = new Player( playerName, playerType, color, this.board );
      console.log( `Created ${ color } player: ${ playerName }` );

      // If the red player's name is entered, prompt for the yellow player's name
      if ( color === 'red' ) { this.askForNamesAndTypes( 'yellow' ); return; }
     
        // Once both names are entered, set the flag and re-render 
        console.log( 'Both players registered' );
        this.namesEntered = true;
        this.render();  // Re-render with names and player details
        this.board.initiateBotMove();

        // make players global for debugging
        globalThis.playerX = this.playerX;
        globalThis.playerO = this.playerO;
      
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

      // Ask which player starts
      await this.dialog.ask(
        `IT'S ${ this.namePossessive( playerToStart.name ).toUpperCase() } TURN TO START!`, [ 'OK' ]
      );

      // Create a fresh game instance with the same players but a new board
      const newGameApp = new App( this.playerRed, this.playerYellow, playerToStart.color );

      // Render the new game
      newGameApp.render();
    }

    globalThis.newPlayers = () => new App();
  }

  renderPlayAgainButtons () {
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
