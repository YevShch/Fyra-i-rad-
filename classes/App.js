import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js'; 

export default class App {

    constructor () {
        this.playerX = null; // Initialize player X
        this.playerO = null; // Initialize player O
        this.board = null;   // Initialize the game board
    }

    createPlayers () {
        console.clear();  // Clear the console

        console.log('FOUR-IN-A-ROW\n');  // Print the game title

        // Prompt for player names
        const playerXName = prompt('Spelare X:s namn: '); // Ask for Player X's name
        const playerOName = prompt('Spelare O:s namn: '); // Ask for Player O's name

        // Create player objects
        this.playerX = new Player(playerXName, 'X'); // Create Player X with the given name and color 'X'
        this.playerO = new Player(playerOName, 'O'); // Create Player O with the given name and color 'O'
    }

    startGameLoop () {
        // Implement this method
    }

    // Method to check the game status and return the appropriate message
    whoHasWonOnGameOver(board, playerX, playerO) {
        let winnerName = null;

        if (board.winner === playerX.color) {
            winnerName = playerX.name;
        } else if (board.winner === playerO.color) {
            winnerName = playerO.name;
        }

        if (winnerName) {
            return `${winnerName} has won the game!`;
        } else if (board.isADraw) {
            return "The game ended in a draw!";
        } else {
            return "The game is still ongoing.";
        }
    }

    startGame () {
        while (true) {
            this.createPlayers(); // Create players
            this.board = new Board(); // Create a new game board
            this.startGameLoop(); // Start the game loop
            this.whoHasWonOnGameOver(); // Determine and announce the winner or if it's a draw

            // Ask if the user wants to play again
            console.log('');
            let playAgain = prompt('Vill ni spela igen? (ja/nej)? '); // Ask if they want to play again
            if (playAgain !== 'ja') {
                break; // Exit the loop if the user doesn't want to play again
            }
        }
    }
}
