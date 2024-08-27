
import prompt from '../helpers/prompt.js';
import Board from './Board.js';

export default class App {

    constructor () {
        this.playerX = null;
        this.playerO = null;
        this.board = null;
    }

    createPlayers () {
        
    }

    startGameLoop () {
        
    }

    whoHasWonOnGameOver () {
        
    }

    startGame () {
        while ( true ) {
            this.createPlayers(); // Initialize players
            this.board = new Board(); // Create a new game board
            this.startGameLoop(); // Start the game loop
            this.whoHasWonOnGameOver(); // Determine and announce the winner or if it's a draw

            // Ask if the user wants to play again
            console.log( '' );
            let playAgain = prompt( 'Vill ni spela igen? (ja/nej)? ' );
            if ( playAgain !== 'ja' ) {
                break; // Exit the loop if the user doesn't want to play again
            }
        }
    }
}