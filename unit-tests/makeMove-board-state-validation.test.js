import { expect, vi, test } from 'vitest';
import Board from '../classes/Board.js';

test( '11. Confirm that the board remains unchanged after an invalid move.', () => {
  const board = new Board();

  // Make a valid move
  const validMove = board.makeMove( 'X', 1 );
  expect( validMove ).toBe( true );

  // Save the state of the board after the valid move
  const boardStateAfterValidMove = JSON.stringify( board.matrix );

  // Make a invalid move
  const inValidMove = board.makeMove( 'O', 'invalidMove' );
  expect( inValidMove ).toBe( false );

  // Check that the board is updated correctly
  expect( JSON.stringify( board.matrix ) ).toEqual( boardStateAfterValidMove ); // Bottom of column 0 should have 'X'

} );  


test( "12. Test that makeMove returns false and does not change the board when the game is already over.", () => {
  const board = new Board();

  // make game over
  board.gameOver = true;

  // save the state of the board after game is over
  const boardStateBeforeMove = JSON.stringify( board.matrix );

  // make move after the game is over 
  const moveAfterGameIsOver = board.makeMove( 'X', 2 );

  // check that makeMove returns false after move
  expect( moveAfterGameIsOver ).toBe( false );

  // save the state of the board after game is over
  const boardStateAfterMove = JSON.stringify( board.matrix );

  // check that makeMove does not change the board after move 
  expect( boardStateAfterMove ).toEqual( boardStateBeforeMove );

} );

