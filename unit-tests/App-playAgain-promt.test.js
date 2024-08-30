import { test, expect, vi } from 'vitest';
import { setMockAnswers, log } from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';
import Player from '../classes/Player.js';
import Board from '../classes/Board.js';

test( "Check that askToPlayAgain prompts correctly and restarts the game loop when the user answers - ja", () => {
  // Mocking the prompt function's response
  setMockAnswers( 'ja' );

  // Create an instance of the App class and set the players
  const app = new App();
  app.playerX = new Player( 'Anna', 'X' );
  app.playerO = new Player( 'Ola', 'O' );
  app.board = new Board();

  // Mock the startGameLoop method to check if it gets called
  const startGameLoopSpy = vi.spyOn( app, 'startGameLoop' ).mockImplementation( () => {
    app.board.gameOver = true; // End the game immediately after the first loop
  } );

  // Call the createPlayers method to initiate a new game process
  app.createPlayers();

  // Check if the startGameLoop method was called after askToPlayAgain
  app.askToPlayAgain(); // This will call prompt and return 'ja', which initiates a game restart

  expect( startGameLoopSpy ).toHaveBeenCalledTimes( 1 ); // Verify that the game loop was started

  log( "Pass: askToPlayAgain prompts correctly and restarts the game loop when the user answers - ja." );

  // Restore mocks
  promptMock.mockRestore();
  startGameLoopSpy.mockRestore();
} );


// describe('App playAgainPrompt', () => {
//   it('should start a new game when the user answers "ja"', () => {
//     const app = new App();

//     // Simulera användarinmatning för "ja"
//     app.askToPlayAgain = () => 'ja';

//     // Kontrollera att ett nytt spel börjar
//     // app.resetGame = () => app.board = new Board(); // Återställ spelbrädet
//     // app.startGameLoop = () => console.log('Game loop started');

//     app.askToPlayAgain();

//     expect(app.board).toEqual(new Board()); // Kontrollera att brädet är återställt
//   });

//   it('should terminate the game when the user answers anything other than "ja"', () => {
//     const app = new App();

//     // Simulera användarinmatning för "nej"
//     app.askToPlayAgain = () => 'nej';

//     const log = console.log;
//     console.log = (message) => {
//       expect(message).toBe('Spelet avslutas. Tack för att ni spelade!');
//     };

//     app.askToPlayAgain();

//     console.log = log; // Återställ console.log
//   });
// });
