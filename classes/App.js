import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {

    constructor () {
        this.playerX = null; // Initialize player X
        this.playerO = null; // Initialize player O
        this.board = null;   // Initialize the game board
    }


    createPlayers() {
        console.clear(); // Clear the console for a fresh start
        console.log('FOUR-IN-A-ROW\n');

        // Prompt user for Player X and Player O names and store them
        const playerXName = prompt('Spelare X:s namn: ');
        const playerOName = prompt('Spelare O:s namn: ');

        this.playerX = new Player(playerXName, 'X');
        this.playerO = new Player(playerOName, 'O');
    }

    startGameLoop () {
        while ( !this.board.gameOver ) {
            let player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;

            let column = prompt( `Ange ditt drag ${ player.color } ${ player.name } - skriv in kolumn: ` );

            // convert input to number and subtract 1 to get index zero
            column = +column.trim() - 1;

            // try to make move
            const moveMade = this.board.makeMove( player.color, column );

            // if a move was not made (e.g. a column is full), ask the player to make a move again
            if ( !moveMade ) {
                continue;
            }

            // drawing the board after each move
            this.board.render();
        }
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
        while ( true ) {
            this.createPlayers(); // Create players
            this.board = new Board(); // Create a new game board
            this.startGameLoop(); // Start the game loop
            this.whoHasWonOnGameOver(); // Determine and announce the winner or if it's a draw

            // Ask if the user wants to play again
            console.log( '' );
            let playAgain = prompt( 'Vill ni spela igen? (ja/nej)? ' ); // Ask if they want to play again
            if ( playAgain !== 'ja' ) {
                break; // Exit the loop if the user doesn't want to play again
            }
        }
    }
}
