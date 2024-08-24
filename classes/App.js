import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {

    constructor () {
        // Infinite loop to repeatedly play the game until the user decides to quit
        while (true) {
            this.createPlayers(); // Initialize players
            this.board = new Board(); // Create a new game board
            // this.startGameLoop(); // Start the game loop
            // this.whoHasWonOnGameOver(); // Determine and announce the winner or if it's a draw

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

}
