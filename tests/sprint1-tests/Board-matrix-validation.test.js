import { expect, test } from 'vitest';
import Board from '../../classes/Board.js';


test( '1. Check that the matrix property is defined when a Board is created', () => {
  let aBoard = new Board();
  expect( aBoard.matrix ).toBeDefined();
  console.log( "Pass: The matrix property is defined when the Board is created." );
} );


test( '2. Initialize the matrix property as an empty board when a Board is created', () => {
  let aBoard = new Board();
  for ( let row of aBoard.matrix ) {
    for ( let cell of row ) {
      expect( cell ).toBe( ' ' );
    }
  }
  console.log( "Pass: The matrix is initialized as an empty board (all cells are ' ')." );
} );


test( '3. Check that the board has 6 rows and 7 columns', () => {
  let aBoard = new Board();
  expect( aBoard.matrix ).toHaveLength( 6 );
  console.log( "Pass: The board has 6 rows." );

  for ( let row of aBoard.matrix ) {
    expect( row ).toHaveLength( 7 );
  }
  console.log( "Pass: Each row in the board has 7 columns." );
} );
