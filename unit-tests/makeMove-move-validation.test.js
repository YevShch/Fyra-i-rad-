import { expect, test } from 'vitest';
import Board from '../classes/Board.js';


test( '6. Check that makeMove should only allow colors "X" or "O"', () => {
  let board = new Board();
  // Test with valid color 'X'
  const resultX = board.makeMove( 'X', 0 );
  expect( resultX ).toBe( true );

  // Test with valid color 'O'
  const resultO = board.makeMove( 'O', 1 );
  expect( resultO ).toBe( true );

  // Test with invalid color 'A'
  const resultA = board.makeMove( 'A', 2 );
  expect( resultA ).toBe( false );

  // Test with invalid color '1'
  const result1 = board.makeMove( '1', 3 );
  expect( result1 ).toBe( false );

  // Test with an empty string
  const resultEmpty = board.makeMove( '', 4 );
  expect( resultEmpty ).toBe( false );

  // Test with null
  const resultNull = board.makeMove( null, 5 );
  expect( resultNull ).toBe( false );

  // Test with undefined
  const resultUndefined = board.makeMove( undefined, 6 );
  expect( resultUndefined ).toBe( false );
} );


import { expect, test } from 'vitest';
import Board from '../classes/Board.js';

test( '8. Verify that the `makeMove` function returns `false` for invalid column inputs', () => {
  let board = new Board();

  // Valid move - should succeed
  expect( board.makeMove( 'X', 0 ) ).toBe( true );
  console.log( 'Testing with a valid column value (0)' );

  // Invalid column inputs - should all return false

  // Negative column value
  expect( board.makeMove( 'X', -1 ) ).toBe( false );
  console.log( 'Testing with a negative column value (-1)' );

  // Non-numeric column value
  expect( board.makeMove( 'X', 'A' ) ).toBe( false );
  console.log( 'Testing with a non-numeric string value ("A")' );

  // Null value
  expect( board.makeMove( 'X', null ) ).toBe( false );
  console.log( 'Testing with a null column value' );

  // Array value
  expect( board.makeMove( 'X', [ 1, 2, 3 ] ) ).toBe( false );
  console.log( 'Testing with an array column value ([1, 2, 3])' );

  // Object value
  expect( board.makeMove( 'X', { 1: 1, name: 'Anna' } ) ).toBe( false );
  console.log( 'Testing with an object column value ({1: 1, "name": "Anna"})' );

  // Undefined value
  expect( board.makeMove( 'X', undefined ) ).toBe( false );
  console.log( 'Testing with an undefined column value' );

  // Boundary column values - should succeed
  expect( board.makeMove( 'O', 0 ) ).toBe( true );
  expect( board.makeMove( 'X', 6 ) ).toBe( true );
  console.log( 'Testing with boundary column values (0 and 6)' );

  // Column values outside the valid range
  expect( board.makeMove( 'X', 100 ) ).toBe( false );
  expect( board.makeMove( 'O', -5 ) ).toBe( false );
  console.log( 'Testing with column values outside the valid range (100 and -5)' );
} );

test( '9. Check that makeMove returns true for a valid move and updates the board correctly', () => {
  const board = new Board();

  // Make a valid move
  const result = board.makeMove( 'X', 0 );
  expect( result ).toBe( true );

  // Check that the board is updated correctly
  expect( board.matrix[ 5 ][ 0 ] ).toBe( 'X' ); // Bottom of column 0 should have 'X'
  expect( board.currentPlayerColor ).toBe( 'O' ); // Turn should now be 'O'
} );


test( '10 a. Verify that makeMove returns false when the game is over', () => {
  const board = new Board();
  // Set gameOver to true to test this case
  board.gameOver = true;
  expect( board.makeMove( 'X', 0 ) ).toBe( false ); // Game is over, move should not be made

  // Reset game state to normal
  board.gameOver = false;
} );


test( '10 b. Verify that makeMove returns false if a move is made in a full column', () => {
  const board = new Board();
  const players = [ 'X', 'O' ];

  // Fill column 0 by alternating 'X' and 'O'
  for ( let i = 0; i < 6; i++ ) {
    let player = players[ i % players.length ];
    board.makeMove( player, 0 );
  };  
  // board.makeMove( 'X', 0 );
  // board.makeMove( 'O', 0 );
  // board.makeMove( 'X', 0 );
  // board.makeMove( 'O', 0 );
  // board.makeMove( 'X', 0 );
  // board.makeMove( 'O', 0 );

  // check the state of the board before making a move
  console.log( 'Board state before full column move:', board.matrix );

  // Check that the column is full and new move is not possible
  const result = board.makeMove( 'X', 0 );
  console.log( 'Attempted move result:', result );

  // The column should be full, so move should not be made
  expect( result ).toBe( false );

} );


test( "10 c. Check that makeMove returns false if it's not the player's turn", () => {
  const board = new Board();

  board.currentPlayerColor = 'X'; // Set current player to 'X'
  expect( board.makeMove( 'O', 1 ) ).toBe( false ); // 'O' tries to move when it's 'X' turn

} );
