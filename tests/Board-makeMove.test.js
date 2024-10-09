import { expect, test } from 'vitest';
import Board from '../classes/Board.js';

test( '11. Confirm that the board is updated correctly after a valid move.', () => {
  const board = new Board();

  // Save the initial state of the board
  const initialBoardState = JSON.stringify( board.matrix );

  // Make a valid move in the first column (index 0)
  const validMove = board.makeMove( 'red', 0 );
  expect( validMove ).toBe( true );

  // Check that the board has changed after the valid move
  expect( JSON.stringify( board.matrix ) ).not.toEqual( initialBoardState );

  // Confirm that the bottom of the first column (index 0) has the 'red' symbol
  expect( board.matrix[ board.matrix.length - 1 ][ 0 ] ).toBe( 'red' );
  console.log( "Pass: the board is updated correctly after a valid move." )
} );

test( '11.a Confirm that the board remains unchanged after an invalid move.', () => {
  const board = new Board();

  // Make a valid move
  const validMove = board.makeMove( 'red', 1 );
  expect( validMove ).toBe( true );

  // Save the state of the board after the valid move
  const boardStateAfterValidMove = JSON.stringify( board.matrix );

  // Make a invalid move
  const inValidMove = board.makeMove( 'yellow', 'invalidMove' );
  expect( inValidMove ).toBe( false );

  // Check that the board is updated correctly
  expect( JSON.stringify( board.matrix ) ).toEqual( boardStateAfterValidMove ); // Bottom of column 0 should have 'red'
  console.log( "Pass: the board remains unchanged after an invalid move." )
} );


test( "12. Test that makeMove returns false and don't change the board when the game is already over.", () => {
  const board = new Board();

  // make game over
  board.gameOver = true;

  // save the state of the board after game is over
  const boardStateBeforeMove = JSON.stringify( board.matrix );

  // make move after the game is over 
  const moveAfterGameIsOver = board.makeMove( 'red', 2 );

  // check that makeMove returns false after move
  expect( moveAfterGameIsOver ).toBe( false );

  // save the state of the board after game is over
  const boardStateAfterMove = JSON.stringify( board.matrix );

  // check that makeMove does not change the board after move 
  expect( boardStateAfterMove ).toEqual( boardStateBeforeMove );
  console.log( "Pass: makeMove returns false and don't change the board when the game is already over." )
} );
