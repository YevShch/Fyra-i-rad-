
import { expect, test } from 'vitest';
import Board from '../../classes/Board.js';

test( "17. Check that drawCheck returns true if the board is filled", () => {
  const board = new Board();

  const drawCombo = [
    [ 'O', 'X', 'X', 'O', 'O', 'X', 'O' ],
    [ 'X', 'O', 'O', 'X', 'X', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'O', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'X', 'X', 'O' ],
    [ 'X', 'O', 'X', 'O', 'O', 'X', 'X' ],
    [ 'O', 'O', 'X', 'X', 'O', 'X', 'O' ]
  ];

  board.matrix = drawCombo;

  const result = board.drawCheck();
  expect( result ).toBe( true );
  console.log( "Pass: drawCheck should return true if the board is filled." );
} );

test( "17 a. Check that drawCheck returns false if the board has an empty cell", () => {
  const board = new Board();

  const ongoingGameState = [
    [ 'O', 'X', 'X', ' ', 'O', 'X', 'O' ],
    [ 'X', 'O', 'O', 'X', 'X', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'O', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'X', 'X', 'O' ],
    [ 'X', 'O', 'X', 'O', 'O', 'X', 'X' ],
    [ 'O', 'O', 'X', 'X', 'O', 'X', 'O' ]
  ];

  board.matrix = ongoingGameState;

  const result = board.drawCheck();
  expect( result ).toBe( false );
  console.log( "Pass: drawCheck should return false if the board has an empty cell." );
} );

test( "18. Check that drawCheck returns false if someone wins", () => {
  const board = new Board();

  // Set the winner 
  board.winner = 'red';

  const result = board.drawCheck();
  expect( result ).toBe( false );
  console.log( "Pass: drawCheck should return false if someone wins." );
} );

test( "19. Check that drawCheck returns false if the game is not over", () => {
  const board = new Board();

  // Imitate the game not being over
  board.gameOver = false;

  const result = board.drawCheck();
  expect( result ).toBe( false );
  console.log( "Pass: drawCheck should return false if the game is not over." );
} );

// Сhanged the player colors to red and yellow so that the test would work in this sprint with the GUI version of the game
test( 'drawCheck should return false when the move in the last empty cell results in a win', () => {
  const board = new Board();

  // Fill the board so that almost all cells are filled
  board.matrix = [
    [ 'yellow', 'red', 'red', ' ', 'yellow', 'red', 'yellow' ],
    [ 'red', 'yellow', 'yellow', 'red', 'red', 'yellow', 'red' ],
    [ 'yellow', 'red', 'yellow', 'red', 'yellow', 'yellow', 'red' ],
    [ 'yellow', 'red', 'yellow', 'red', 'red', 'red', 'yellow' ],
    [ 'red', 'yellow', 'red', 'yellow', 'yellow', 'red', 'red' ],
    [ 'yellow', 'yellow', 'red', 'red', 'yellow', 'red', 'yellow' ]
  ];

  // Set the current player and make the last winning move
  // board.currentPlayerColor = 'red';
  board.makeMove( 'red', 3 );


  const result = board.drawCheck();
  expect( board.gameOver ).toBe( true );
  expect( board.winner ).toBe( 'red' );
  expect( result ).toBe( false ); // Test drawCheck
  console.log( 'Pass: drawCheck should return false when the last move results in a win.' );
} );

