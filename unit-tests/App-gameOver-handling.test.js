import { describe, it, expect, beforeEach, vi } from 'vitest'; 
import App from '../classes/App.js'; // Import the App class
import Board from '../classes/Board.js'; // Import the Board class
import Player from '../classes/Player.js'; // Import the Player class

describe('whoHasWonOnGameOver', () => {
  let app, playerX, playerO, board;

  beforeEach(() => {
    app = new App();
    playerX = new Player('Alice', 'X');
    playerO = new Player('Bob', 'O');
    board = new Board();

    app.playerX = playerX;
    app.playerO = playerO;
    app.board = board;
  });

  it('should announce the correct winner when player X wins', () => {
    board.winner = 'X';  // Simulate player X winning
    console.log = vi.fn();  // Mock console.log to capture the output
    app.whoHasWonOnGameOver(); 
    expect(console.log).toHaveBeenCalledWith('Alice has won the game!');  // Check the output
  });
  // Test for correct draw message
  it('should return a draw message when the game ends in a draw', () => {
    board.isADraw = true; // Assume the game ended in a draw
    console.log = vi.fn();  // Mock console.log to capture the output

    app.whoHasWonOnGameOver();
    expect(console.log).toHaveBeenCalledWith('The game ended in a draw!');
  });

  // Test for ongoing game
  it('should return a message indicating the game is ongoing', () => {
    console.log = vi.fn();  // Mock console.log to capture the output
    app.whoHasWonOnGameOver();
    expect(console.log).toHaveBeenCalledWith('The game is still ongoing.');
  });
});