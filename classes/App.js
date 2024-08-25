import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {

    constructor () {
        // Infinite loop to repeatedly play the game until the user decides to quit
        while (true) {
            this.createPlayers(); // Initialize players
            this.board = new Board(); // Create a new game board
            this.startGameLoop(); // Start the game loop
            this.whoHasWonOnGameOver(); // Determine and announce the winner or if it's a draw

            // Ask if the user wants to play again
            console.log('');
            let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
            if (playAgain !== 'ja') { 
                break; // Exit the loop if the user doesn't want to play again
            }
        }
    }

    createPlayers () {
        console.clear(); // Clear the console for a fresh start
        console.log('FOUR-IN-A-ROW\n');

        // Prompt user for Player X and Player O names and store them
        const playerXName = prompt('Spelare X:s namn: ');
        const playerOName = prompt('Spelare O:s namn: ');

        this.playerX = new Player(playerXName, 'X');
        this.playerO = new Player(playerOName, 'O');
    }
    startGameLoop() {
    while (!this.board.gameOver) {
        // Determine the current player based on the board's current player color
        let player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;

        let column;
        while (true) {
            // Prompt user to make a move and get the column input
            column = prompt(`Ange ditt drag ${player.color} ${player.name} - skriv in kolumn: `);

            // Convert input to a number and adjust for zero-based index
            column = parseInt(column.trim(), 10) - 1;

            // Check if the input is a valid number and within the valid range of columns
            if (!isNaN(column) && column >= 0 && column < this.board.columns) {
                // Try to make a move, and if successful, break the loop
                if (this.board.makeMove(player.color, column)) {
                    break;
                } else {
                    alert("Ogiltigt drag! Kolumnen är full. Försök igen.");
                }
            } else {
                alert("Ogiltig inmatning! Ange ett giltigt kolumnnummer.");
            }
        }

        // Render the board after each valid move
        this.board.render();

        // Optional: Check if the game is over after the move
        if (this.board.gameOver) {
            alert(`Spelet är över! ${player.name} vann.`);
            break;
        }
    }
}

    }

 
