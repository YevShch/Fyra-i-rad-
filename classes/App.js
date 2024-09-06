//last version with the confetti animation and a color circle next player's name
import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';

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
        console.log( 'Constructor: playerRed and playerYellow set directly' );
      } else {
        // Initialize players but allow board to render immediately
        this.namesEntered = false;
        this.render();  // Render the board and title immediately
        this.askForNames(); // Prompt for player names asynchronously
      }
    } catch ( error ) {
      console.error( 'Error during game initialization:', error );
      this.displayErrorMessage( 'An error occurred during the game initialization. Please reload the page.' );
    }
  }

  async askForNames ( color = 'red' ) {
    try {
      const okName = name => name.match( /[a-zåäöA-ZÅÄÖ]{2,}/ );
      let playerName = '';

      // Request the player's name until it is valid
      while ( !okName( playerName ) ) {
        const promptHtml = `
          <div class="prompt-text">Enter the name of player ${ this.generateColorCircle( color ) }:</div>
        `;
        playerName = await this.dialog.ask( promptHtml );
        await sleep( 500 );
      }

      // Create a player object
      this[ `player${ color.charAt( 0 ).toUpperCase() + color.slice( 1 ) }` ] = new Player( playerName, color );
      console.log( `Created ${ color } player: ${ playerName }` );

      // If the red player's name is entered, prompt for the yellow player's name
      if ( color === 'red' ) {
        await this.askForNames( 'yellow' );
      } else {
        // Once both names are entered, set the flag and re-render
        this.namesEntered = true;
        this.render();  // Re-render with names and player details
      }
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
      let color = this.board.gameOver ? this.board.winner : this.board.currentPlayerColor;
      let player = color === 'red' ? this.playerRed : this.playerYellow;
      let name = player?.name || '';

      document.querySelector( 'main' ).innerHTML = /*html*/`
        <h1>CONNECT FOUR</h1>
        ${ !this.board.gameOver && player ?
          `<p>${ this.generateColorCircle( color ) } ${ this.namePossessive( name ) } turn...</p>` :
          ( this.namesEntered ? '' : '<p>Waiting for player names...</p>' ) }
        ${ this.board.render() }
        <div class="buttons">
          ${ !this.board.gameOver ?
          this.renderQuitButton() :
          this.renderPlayAgainButtons() }
        </div>
      `;

      // Create confetti if the game is over and there's a winner
      if ( this.board.gameOver && this.board.winner ) {
        this.createConfetti();
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
        let answer = await this.dialog.ask( 'What do you want to do?', [ 'Continue', 'Replay', 'New game' ] );
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

  createConfetti () {
    const confettiContainer = document.getElementById( 'confetti-container' );
    confettiContainer.innerHTML = '';

    const numConfetti = 150;
    for ( let i = 0; i < numConfetti; i++ ) {
      const confetti = document.createElement( 'div' );
      confetti.classList.add( 'confetti' );
      confetti.style.left = `${ Math.random() * 100 }vw`;
      confetti.style.top = `${ Math.random() * 100 }vh`;
      confetti.style.backgroundColor = this.getRandomColor();
      confetti.style.width = `${ Math.random() * 10 + 10 }px`;
      confetti.style.height = confetti.style.width;
      confettiContainer.appendChild( confetti );
    }

    setTimeout( () => {
      confettiContainer.innerHTML = '';
    }, 5000 );
  }

  getRandomColor () {
    const colors = [ '#8CC0E6', '#FFD700', '#C0C0C0', '#FFA500', '#4CAF50', '#9C27B0', '#F48FB1', '#2196F3', '#4DB6AC', '#FFEB3B', '#8D6E63', '#03A9F4', '#E1BEE7' ];
    return colors[ Math.floor( Math.random() * colors.length ) ];
  }
}
