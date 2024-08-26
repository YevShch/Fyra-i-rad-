import { describe, it, expect } from 'vitest'; 
import App from '../classes/App.js'; // Import the App class
import Board from '../classes/Board.js'; // Import the Board class
import Player from '../classes/Player.js'; // Import the Player class

describe('whoHasWonOnGameOver', () => {

  // Test for correct win message
  it('should return a win message when a player wins', () => {
    const board = new Board();
    const playerX = new Player('Alice', 'R');
    const playerO = new Player('Bob', 'Y');
    board.winner = 'R'; // Assume Red player won

    // Call the static method (becuse don't want to call constructor, because test will be
    // more complicated to check all the logic)
    const result = App.whoHasWonOnGameOver(board, playerX, playerO);
    expect(result).toBe('Alice has won the game!');
  });

  // Test for correct draw message
  it('should return a draw message when the game ends in a draw', () => {
    const board = new Board();
    const playerX = new Player('Alice', 'R');
    const playerO = new Player('Bob', 'Y');
    board.isADraw = true; // Assume the game ended in a draw

    // Call the static method
    const result = App.whoHasWonOnGameOver(board, playerX, playerO);
    expect(result).toBe('The game ended in a draw!');
  });

  // Test for ongoing game
  it('should return a message indicating the game is ongoing', () => {
    const board = new Board();
    const playerX = new Player('Alice', 'R');
    const playerO = new Player('Bob', 'Y');

    // Call the static method
    const result = App.whoHasWonOnGameOver(board, playerX, playerO);
    expect(result).toBe('The game is still ongoing.');
  });
});