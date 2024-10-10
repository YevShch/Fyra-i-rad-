import { expect, test } from 'vitest';
import Board from '../../classes/Board.js';

test( "13. Check that after a valid move, the current player's turn is updated to the opposite player.", () => {
  const board = new Board();

  // Save the state of the current player color before the valid move
  const playerColorBeforeValidMove = board.currentPlayerColor;

  // Attempt an valid move (e.g., passing a non-numeric value for the column)
  const validMove = board.makeMove( 'red', 1 );
  expect( validMove ).toBe( true );

  // Check that it's the opposite player's turn 
  expect( board.currentPlayerColor ).not.toBe( playerColorBeforeValidMove )
  expect( board.currentPlayerColor ).toBe( 'yellow' );

} );


test( "14. Validate that after an invalid move, the current player's turn does not change.", () => {
  const board = new Board();

  // Save the state of the current player color before the invalid move
  const playerColorBeforeInvalidMove = board.currentPlayerColor;

  // Attempt an invalid move (e.g., passing a non-numeric value for the column)
  const invalidMove = board.makeMove( 'red', 'invalidMove' );
  expect( invalidMove ).toBe( false );

  // Check that it's still the same player's turn since the invalid move was not executed
  expect( board.currentPlayerColor ).toBe( playerColorBeforeInvalidMove );

} );


test( '15. Confirm that the game properly alternates turns after each valid move.', () => {
  const board = new Board();

  // Save the state of the current player before the first valid move
  const playerColorBeforeFirstMove = board.currentPlayerColor;

  // Make the first valid move
  board.makeMove( playerColorBeforeFirstMove, 1 );

  // Check that the current player has changed
  const playerColorAfterFirstMove = board.currentPlayerColor;

  // Make the second valid move
  board.makeMove( playerColorAfterFirstMove, 2 );

  // Check that the current player has changed again
  expect( board.currentPlayerColor ).not.toBe( playerColorAfterFirstMove );

  // Check that the player has returned to the original player
  expect( board.currentPlayerColor ).toBe( playerColorBeforeFirstMove );
} );
