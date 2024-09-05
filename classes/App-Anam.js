import Board from './Board.js';
import Player from './Player.js';

export default class App {
  constructor() {
    try {
      this.playerRed = null;    // Initialize RED player
      this.playerYellow = null; // Initialize YELLOW player
      this.board = null;        // Initialize the game board
      this.currentPlayer = null; // Initialize the current player
    } catch (error) {
      console.error('Error during initialization:', error);
      this.displayErrorMessage('An error occurred while initializing the game. Please try reloading the page.');
    }
  }

  startGame() {
    try {
      this.createPlayers();
      this.board = new Board();
      this.startGameLoop();
      this.whoHasWonOnGameOver();
    } catch (error) {
      console.error('Error during game start:', error);
      this.displayErrorMessage('An error occurred while starting the game. Please try again.');
    }
  }

  getPlayerName(color) {
    try {
      // Retrieve the player's name from your GUI input fields here
      // Example: return new Player(document.getElementById(`player${color}Name`).value, color);
      return new Player(`Player ${color}`, color); // Placeholder for GUI input
    } catch (error) {
      console.error(`Error getting player name for ${color}:`, error);
      this.displayErrorMessage(`An error occurred while setting player ${color}. Please enter a valid name.`);
    }
  }

  createPlayers() {
    try {
      console.clear(); // Clear the console for a fresh start
      console.log('FOUR-IN-A-ROW\n');

      // This part would be replaced by GUI logic
      this.playerRed = this.getPlayerName('RED');
      this.playerYellow = this.getPlayerName('YELLOW');

      if (!this.playerRed || !this.playerYellow) {
        throw new Error('Players not initialized correctly.');
      }

      this.currentPlayer = this.playerRed; // RED starts the game
    } catch (error) {
      console.error('Error during player creation:', error);
      this.displayErrorMessage('An error occurred while creating players. Please try again.');
    }
  }

  startGameLoop() {
    try {
      while (!this.board.gameOver) {
        let player = this.currentPlayer;

        // The column choice would come from a GUI interaction instead of prompt
        // Example: let column = this.getSelectedColumnFromGUI();
        let column = 0; // Placeholder for GUI input

        if (isNaN(column) || column < 0 || column >= this.board.columns) {
          console.error('Invalid column input.');
          this.displayErrorMessage('Invalid column selection. Please try again.');
          continue;
        }

        const moveMade = this.board.makeMove(player.color, column);

        if (!moveMade) {
          this.displayErrorMessage('Invalid move. Please select a different column.');
          continue;
        }

        // Update the GUI to reflect the new board state
        this.board.render();

        // Switch to the next player
        this.currentPlayer = (this.currentPlayer === this.playerRed) ? this.playerYellow : this.playerRed;
      }
    } catch (error) {
      console.error('Error during game loop:', error);
      this.displayErrorMessage('An error occurred during the game loop. Please restart the game.');
    }
  }

  whoHasWonOnGameOver() {
    try {
      let winnerName = null;

      if (this.board.winner === this.playerRed.color) {
        winnerName = this.playerRed.name;
      } else if (this.board.winner === this.playerYellow.color) {
        winnerName = this.playerYellow.name;
      }

      if (winnerName) {
        console.log(`${winnerName} har vunnit!`);
        // Update the GUI to show the winner
      } else if (this.board.isADraw) {
        console.log("Spelet slutade oavgjort!");
        // Update the GUI to show the game ended in a draw
      } else {
        console.log("Spelet pågår fortfarande.");
      }
    } catch (error) {
      console.error('Error determining the winner:', error);
      this.displayErrorMessage('An error occurred while determining the game result.');
    }
  }

  askToPlayAgain() {
    try {
      // GUI would prompt the player if they want to play again
      return false; // Placeholder for GUI logic
    } catch (error) {
      console.error('Error asking to play again:', error);
      this.displayErrorMessage('An error occurred while asking to play again.');
      return false;
    }
  }

  displayErrorMessage(message) {
    // Display a simple error message to the user in the DOM
    const errorContainer = document.createElement('div');
    errorContainer.style.color = 'red';
    errorContainer.textContent = message;
    document.body.appendChild(errorContainer);
  }
}
