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

    // startGameLoop () {
    //     while (!this.board.gameOver) {
    //         // Determine the current player based on the board's current player color
    //         let player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;

    //         // Prompt user to make a move and get the column input
    //         let column = prompt(`Ange ditt drag ${player.color} ${player.name} - skriv in kolumn: `);

    //         // Convert input to a number and adjust for zero-based index
    //         column = +column.trim() - 1;

    //         // Try to make a move, and if not successful, prompt the player again
    //         const moveMade = this.board.makeMove(player.color, column);
    //         if (!moveMade) {
    //             continue;
    //         }

    //         // Render the board after each move
    //         this.board.render();
    //     }
    // }

    // whoHasWonOnGameOver () {
    //     // The game is over, determine and announce the result
    //     console.clear();
    //     this.board.render();

    //     if (this.board.winner) {
    //         // If there's a winner, announce the winning player
    //         let winningPlayer = this.board.winner === 'X' ? this.playerX : this.playerO;
    //         console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`);
    //     } else {
    //         // If there's no winner, announce a draw
    //         console.log('Tyvärr det blev oavgjort...');
    //     }
    // }
}
