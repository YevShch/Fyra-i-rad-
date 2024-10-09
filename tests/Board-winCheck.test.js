import { describe, it, expect } from 'vitest'; // or 'jest' if you're using Jest
//import { winCheck } from '../classes/Board.js'; // Import your winCheck function
import Board from '../classes/Board.js';
describe( 'winCheck', () => {

  it( 'should return true for a horizontal win', () => {
    // Manually create a board state with a horizontal win for 'R'
    const board = new Board();
    board.matrix = [
      [ 'R', 'R', 'R', 'R', null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
    ];

    // We assume the last move was at row 0, column 3
    const hasWon = board.winCheck( 0, 3 );
    expect( hasWon ).toBe( true );
  } );
  // Test vertical win
  it( 'should return true for a vertical win', () => {
    const board = new Board();
    board.matrix = [
      [ 'R', null, null, null, null, null, null ],
      [ 'R', null, null, null, null, null, null ],
      [ 'R', null, null, null, null, null, null ],
      [ 'R', null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
    ];
    expect( board.winCheck( 3, 0 ) ).toBe( true ); // Last move at (3, 0)
  } );

  // Test diagonal win (bottom-left to top-right)
  it( 'should return true for a diagonal win (bottom-left to top-right)', () => {
    const board = new Board();
    board.matrix = [
      [ 'R', null, null, null, null, null, null ],
      [ null, 'R', null, null, null, null, null ],
      [ null, null, 'R', null, null, null, null ],
      [ null, null, null, 'R', null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
    ];
    expect( board.winCheck( 3, 3 ) ).toBe( true ); // Last move at (3, 3)
  } );

  // Test diagonal win (top-left to bottom-right)
  it( 'should return true for a diagonal win (top-left to bottom-right)', () => {
    const board = new Board();
    board.matrix = [
      [ null, null, null, 'R', null, null, null ],
      [ null, null, 'R', null, null, null, null ],
      [ null, 'R', null, null, null, null, null ],
      [ 'R', null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
    ];
    expect( board.winCheck( 3, 0 ) ).toBe( true ); // Last move at (3, 0)
  } );

  // Test no win scenario
  it( 'should return false if no one wins', () => {
    const board = new Board();
    board.matrix = [
      [ 'R', 'O', 'R', 'O', 'R', 'O', 'R' ],
      [ 'O', 'R', 'O', 'R', 'O', 'R', 'O' ],
      [ 'R', 'O', 'R', 'R', 'R', 'O', 'R' ],
      [ 'O', 'R', 'O', 'O', 'O', 'R', 'O' ],
      [ 'R', 'O', 'R', 'O', 'R', 'O', 'R' ],
      [ 'O', 'R', 'O', 'R', 'O', 'R', 'O' ],
    ];
    expect( board.winCheck( 5, 6 ) ).toBe( false ); // Last move at (5, 6), but no win
  } );
} );
