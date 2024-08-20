import { expect, vi, test } from 'vitest';
import Board from '../classes/Board.js';


test( '1. Check that the matrix property is defined when a Board is created', () => {
  let aBoard = new Board();
  expect( aBoard.matrix ).toBeDefined();
} );


test( '2. Initialize the matrix property as an empty board when a Board is created', () => {
  let aBoard = new Board();
  for ( let row of aBoard.matrix ) {
    for ( let cell of row ) {
      expect( cell ).toBe( ' ' );
    }
  }
} )


test( '3. Check that the board have 6 rows and 7 columns', () => {
  let aBoard = new Board();
  expect( aBoard.matrix ).toHaveLength( 6 );
  for ( let row of aBoard.matrix ) {
    expect( row ).toHaveLength( 7 );
  }
} )


test( '4. Verify that the makeMove method exists', () => {
  let aBoard = new Board();
  expect( aBoard.makeMove ).toBeDefined();
} );


test( '5. makeMove method takes color and column as its arguments', () => {
  let aBoard = new Board();
  const spy = vi.spyOn( aBoard, 'makeMove' );
  const color = 'X';
  const column = 0;

  // Calling makeMove to verify the arguments passed
  aBoard.makeMove( color, column );

  expect( spy ).toHaveBeenCalledWith( color, column );

  spy.mockRestore(); // Restore original method if necessary
} );


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


test( '7. Check that the makeMove method takes two arguments', () => {
  let aBoard = new Board();

  // Correct arguments - the move should be valid
  expect( aBoard.makeMove( 'X', 0 ) ).toBe( true );

  // insufficient arguments - should return false
  expect( aBoard.makeMove( 'X' ) ).toBe( false );

  // extra arguments - should return false 
  expect( aBoard.makeMove( 'X', 1, 6 ) ).toBe( false );

} );


test( '8. Verify that the `makeMove` function returns `false` for an invalid column input', () => {
  let aBoard = new Board();

  // Correct arguments - the move should be valid
  expect( aBoard.makeMove( 'X', 0 ) ).toBe( true );

  // Prevents a move when the column input is a negative value;  
  expect( aBoard.makeMove( 'X', -1 ) ).toBe( false );

  // Prevents a move when the column input is a non-numeric values;
  expect( aBoard.makeMove( 'X', 'A' ) ).toBe( false );

  //Prevents a move when the column input is a number outside the valid range 
  expect( aBoard.makeMove( 'X', 100 ) ).toBe( false );
  expect( aBoard.makeMove( 'O', -5) ).toBe( false );

  // Test with boundary column values (first and last column)."
  expect( aBoard.makeMove( 'O', 0 ) ).toBe( true );
  expect( aBoard.makeMove( 'X', 6 ) ).toBe( true );
} );



 



