// yevheniia's version of class App for GUI
import Dialog from './Dialog.js';
import Board from './Board.js';
import Player from './Player.js';
import sleep from './helpers/sleep.js';

export default class App {

  constructor(playerRed, playerYellow, whoStarts = 'red') {
    try {
      this.dialog = new Dialog();
      this.board = new Board(this);
      this.board.currentPlayerColor = whoStarts;
      this.whoStarts = whoStarts;
      this.setPlayAgainGlobals();
      if (playerRed && playerYellow) {
        this.playerRed = playerRed;
        this.playerYellow = playerYellow;
        this.namesEntered = true;
      }
      else { this.askForNames(); }
      this.render();
    } catch (error) {
  
      console.error('Error during game initialization:', error);
      this.displayErrorMessage('An error occurred during the game initialization. Please reload the page.');
  }
}

  async askForNames(color = 'red') {
    try {
      const okName = name => name.match(/[a-zåäöA-ZÅÄÖ]{2,}/);
      let playerName = '';
      while (!okName(playerName)) {
        playerName = await this.dialog.ask(`Enter the name of player ${color}:`);
        await sleep(500);
        if (!okName(playerName)) {
          this.displayErrorMessage(`Invalid name. Please enter a valid name for player ${color}.`);
        }
      }
      this[`player${color}`] = new Player(playerName, color);
      if (color === 'red') {
        this.askForNames('yellow');
        return;
      }
      this.namesEntered = true;
      this.render();
    } catch (error) {
      console.error('Error during name entry:', error);
      this.displayErrorMessage('An error occurred while entering player names. Please try again.');
    }
  }

  namePossesive ( name ) {
    // although not necessary, it's nice with a traditional
    // possesive form of the name when it ends with an "s":
    // i.e. "Thomas'" rather than "Thomas's" but "Anna's" :)
    return name + ( name.slice( -1 ).toLowerCase() !== 's' ? `'s` : `'` )
  }

  render() {
    try {
      let color = this.board.currentPlayerColor;
      let player = color === 'red' ? this.playerRed : this.playerYellow;
      let name = player?.name || '';

      document.querySelector('main').innerHTML = /*html*/`
        <h1>CONNECT FOUR</h1>
        ${!this.board.gameOver && player ?
          `<p>${color}: ${this.namePossessive(name)} turn...</p>`
          : (this.namesEntered ? '' : '<p>Enter names</p>')}
        ${!this.board.gameOver ? '' : /*html*/`
          ${!this.board.isADraw ? '' : `<p>It's a tie...</p>`}
          ${!this.board.winner ? '' : `<p>${color}: ${name} won!</p>`}
        `}
        ${this.board.render()}
        <div class="buttons">
          ${!this.board.gameOver ?
          this.renderQuitButton() :
          this.renderPlayAgainButtons()}
        </div>
      `;
    } catch (error) {
      console.error('Error during rendering:', error);
      this.displayErrorMessage('An error occurred while rendering the game. Please try again.');
    }
  }

  renderQuitButton () {
    if (!this.namesEntered) {
      return '';
    }

    globalThis.quitGame = async () => {
      try {
        let answer = await this.dialog.ask(
          'What do you want to do?',
          ['Continue', 'Replay', 'New game']
        );
        answer === 'Replay' && globalThis.playAgain();
        answer === 'New game' && globalThis.newPlayers();
      } catch (error) {
        console.error('Error during quit game dialog:', error);
        this.displayErrorMessage('An error occurred while quitting the game. Please try again.');
      }
    };

    return /*html*/`
      <div class="button" onclick="quitGame()">
        Quit this game
      </div>
    `;
  }

  setPlayAgainGlobals () {
    // play again 
    globalThis.playAgain = async () => {
      try {
      let playerToStart = this.whoStarts === 'red' ? this.playerYellow : this.playerRed;
      await this.dialog.ask(
        `It's ${ this.namePossesive( playerToStart.name ) } turn to start!`, [ 'OK' ] );
      new App( this.playerRed, this.playerYellow, playerToStart.color );
      } catch (error) {
        console.error('Error during play again:', error);
        this.displayErrorMessage('An error occurred while restarting the game. Please try again.');
      }
    };
    // start a-fresh with new players
    globalThis.newPlayers = () => {
      try {
        new App();
      } catch (error) {
        console.error('Error during new game setup:', error);
        this.displayErrorMessage('An error occurred while starting a new game. Please try again.');
      }
    };
  }

  renderPlayAgainButtons () {
    // why not use the button element? 
    // div tags are easier to style in a cross-browser-compatible way
    return /*html*/`
      <div class="button" href="#" onclick="playAgain()">Replay</div>
      <div class="button" href="#" onclick="newPlayers()">New game</div>
    `;
  }

  displayErrorMessage(message) {
    // Display a simple error message to the user in the DOM,
    //making sure they are informed if something goes wrong
    
    const errorContainer = document.createElement('div');
    errorContainer.style.color = 'red';
    errorContainer.textContent = message;
    document.body.appendChild(errorContainer);
  }

}

