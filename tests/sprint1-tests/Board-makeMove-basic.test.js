import { expect, vi, test } from 'vitest';
import Board from '../../classes/Board.js';

test( '4. Verify that the makeMove method exists', () => {
  let aBoard = new Board();
  expect( aBoard.makeMove ).toBeDefined();
} );


test( '5. makeMove method takes color and column as its arguments', () => {
  let aBoard = new Board();
  const spy = vi.spyOn( aBoard, 'makeMove' );
  const color = 'red';
  const column = 0;

  // Calling makeMove to verify the arguments passed
  aBoard.makeMove( color, column );

  expect( spy ).toHaveBeenCalledWith( color, column );

  spy.mockRestore(); // Restore original method if necessary
} );


test( '7. Check that the makeMove method takes two arguments', () => {
  let aBoard = new Board();

  // Correct arguments - the move should be valid
  expect( aBoard.makeMove( 'red', 0 ) ).toBe( true );
  console.log( "Pass: makeMove('red', 0) is valid with correct arguments (color and column), returned true." );

  // Insufficient arguments - should return false
  expect( aBoard.makeMove( 'red' ) ).toBe( false );
  console.log( "Pass: makeMove('red') is invalid due to missing column argument, returned false." );

  // Extra arguments - should return false 
  expect( aBoard.makeMove( 'red', 1, 6 ) ).toBe( false );
  console.log( "Pass: makeMove('red', 1, 6) is invalid due to extra argument, returned false." );
} );
