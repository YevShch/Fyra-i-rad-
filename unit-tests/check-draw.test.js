import { expect, test } from 'vitest';
import Board from '../classes/Board.js';



test( "17. Check that drawCheck return true if it is a draw", () => {
  const board = new Board();

  const drawCombo = [
    [ 'O', 'X', 'X', 'O', 'O', 'X', 'O' ],
    [ 'X', 'O', 'O', 'X', 'X', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'O', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'X', 'X', 'O' ],
    [ 'X', 'O', 'X', 'O', 'O', 'X', 'X' ],
    [ 'O', 'O', 'X', 'X', 'O', 'X', 'O' ] 
  ]
 

  board.matrix = drawCombo;

  expect( board.drawCheck() ).toBe( true );

} ); 


test( "17 a. Check that drawCheck return false if it is not a draw", () => {
  const board = new Board();

  // Imitate a board state with no winner and not yet a draw (i.e., the board is not full and no winning combination)
  const ongoingGameState = [
    [ 'O', 'X', 'X', ' ', 'O', 'X', 'O' ],
    [ 'X', 'O', 'O', 'X', 'X', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'O', 'O', 'X' ],
    [ 'O', 'X', 'O', 'X', 'X', 'X', 'O' ],
    [ 'X', 'O', 'X', 'O', 'O', 'X', 'X' ],
    [ 'O', 'O', 'X', 'X', 'O', 'X', 'O' ]
  ]


  board.matrix = ongoingGameState;

  expect( board.drawCheck() ).toBe( false );

} );


test( "18. Check that drawCheck return false if someone wins", () => {
  const board = new Board();

  //imitate the player winning
  board.winner = true;

  //Check that drawCheck return false
  expect( board.drawCheck() ).toBe( false );

} );


test( "19. Check that drawCheck return false if game is not over", () => {
  const board = new Board();

  //imitate the player winning
  board.gameOver = false;

  //Check that drawCheck return false
  expect( board.drawCheck() ).toBe( false );

} );
