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
