// yevheniia's version of class App for GUI
import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';


export default class App {

  constructor ( playerRed, playerYellow, whoStarts = 'red' ) {
    try {
      this.dialog = new Dialog();
      this.board = new Board( this );
      this.board.currentPlayerColor = whoStarts;
      this.whoStarts = whoStarts;
      this.setPlayAgainGlobals();

      // If players are passed into the constructor, set them directly
      if ( playerRed && playerYellow ) {
        this.playerRed = playerRed;
        this.playerYellow = playerYellow;
        this.namesEntered = true;
        console.log( 'Constructor: playerRed and playerYellow set directly' );
        this.render();
      } else {
        // Otherwise, prompt for player names
        this.namesEntered = false;
        this.askForNames(); // Important: render is called only after names are entered
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
        playerName = await this.dialog.ask( `Enter the name of player ${ color }:` );
        await sleep( 500 ); // Delay to demonstrate async behavior
      }

      // Create a player object
      this[ `player${ color.charAt( 0 ).toUpperCase() + color.slice( 1 ) }` ] = new Player( playerName, color );
      console.log( `Created ${ color } player: ${ playerName }` );

      // If the red player's name is entered, prompt for the yellow player's name
      if ( color === 'red' ) {
        await this.askForNames( 'yellow' );
      } else {
        // Once both names are entered, set the flag and render
        this.namesEntered = true;
        this.render(); // Render is called after both names are entered
      }
    } catch ( error ) {
      console.error( 'Error during name entry:', error );
      this.displayErrorMessage( 'An error occurred while entering player names. Please try again.' );
    }

  }

  namePossesive ( name ) {
    // Possessive form: adds `'s` or just `'` if the name ends with 's'
    return name + ( name.slice( -1 ).toLowerCase() !== 's' ? `'s` : `'` );
  }

  render () {
    try {
      console.log( 'Render called' );

      // Check if player names are entered
      if ( !this.namesEntered ) {
        console.log( 'Names not entered yet. Skipping render.' );
        return; // Do not render if names are not entered yet
      }

      let color = this.board.gameOver ? this.board.winner : this.board.currentPlayerColor;
      let player = color === 'red' ? this.playerRed : this.playerYellow;
      let name = player?.name || '';

      console.log( `Rendering for player: ${ name }, color: ${ color }` );
      console.log( `Player object in render:`, player );
      console.log( 'playerRed:', this.playerRed );
      console.log( 'playerYellow:', this.playerYellow );

      document.querySelector( 'main' ).innerHTML = /*html*/`
      <h1>CONNECT FOUR</h1>
      ${ !this.board.gameOver && player ?
          `<p>${ color }: ${ this.namePossesive( name ) } turn...</p>` :
          ( this.namesEntered ? '' : '<p>Enter names</p>' ) }
      ${ !this.board.gameOver ? '' : /*html*/`
        ${ !this.board.isADraw ? '' : `<p>It's a tie...</p>` }
        ${ !this.board.winner ? '' : `<p>${ color }: ${ name } won!</p>` }
      `}
      ${ this.board.render() }
      <div class="buttons">
        ${ !this.board.gameOver ?
          this.renderQuitButton() :
          this.renderPlayAgainButtons() }
      </div>
    `;
    } catch ( error ) {
      console.error( 'Error during rendering:', error );
      this.displayErrorMessage( 'An error occurred while rendering the game. Please try again.' );
    }
  }

  renderQuitButton () {
    try {
      if ( !this.namesEntered ) { return ''; }

      globalThis.quitGame = async () => {
        let answer = await this.dialog.ask(
          'What do you want to do?',
          [ 'Continue', 'Replay', 'New game' ]
        );
        answer === 'Replay' && globalThis.playAgain();
        answer === 'New game' && globalThis.newPlayers();
      };
    } catch ( error ) {
      console.error( 'Error during quit game dialog:', error );
      this.displayErrorMessage( 'An error occurred while quitting the game. Please try again.' );
    }


    return /*html*/`
      <div class="button" onclick="quitGame()">
        Quit this game
      </div>
    `;
  }


  setPlayAgainGlobals () {
    // play again 
    globalThis.playAgain = async () => {
      let playerToStart = this.whoStarts === 'red' ? this.playerYellow : this.playerRed;
      await this.dialog.ask(
        `IT'S ${ this.namePossesive( playerToStart.name ).toUpperCase() } TURN TO START!`, [ 'OK' ] );
      new App( this.playerRed, this.playerYellow, playerToStart.color );
    }
    // start a-fresh with new players
    globalThis.newPlayers = () => new App();
  }


  renderPlayAgainButtons () {
    return /*html*/`
      <div class="button" onclick="playAgain()">Replay</div>
      <div class="button" onclick="newPlayers()">New game</div>
    `;
  }

  displayErrorMessage ( message ) {
    // Display a simple error message to the user in the DOM,
    //making sure they are informed if something goes wrong

    const errorContainer = document.createElement( 'div' );
    errorContainer.style.color = 'red';
    errorContainer.textContent = message;
    document.body.appendChild( errorContainer );
  }

}
