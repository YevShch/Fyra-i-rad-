import { test, expect, vi } from 'vitest';
import prompt from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';
import Board from '../classes/Board.js'


test("Verify that createPlayers is called when startGame is invoked", () => {
  
  // Create a spy on the createPlayers method
  const appSpy = vi.spyOn(App.prototype, 'createPlayers');

  // Create an instance of the App class
  const app = new App(); 

  // To call method startGame
  app.startGame();

  // Check that the createPlayers method was called
  expect(appSpy).toHaveBeenCalled();
  console.log( 'Pass: createPlayers was called during startGame execution.' );
} );  



test("Verify that Board instance is created when startGame is invoked", () => {
// Create an instance of the App class
const app = new App();

// Mock the Board constructor to avoid actual creation
vi.spyOn( Board.prototype, 'constructor' ).mockImplementation( () => { } );

// Call the startGame method
app.startGame();

// Check that the board property is an instance of Board
expect( app.board ).toBeInstanceOf( Board );
console.log( 'Pass: Board instance was created and assigned to app.board during startGame execution.' );
});


test( "Verify that startGameLoop is called when startGame is invoked", () => {
  // Create a spy on the startGameLoop method
  const appSpy = vi.spyOn( App.prototype, 'startGameLoop' );

  // Create an instance of the App class
  const app = new App(); // This should trigger the createPlayers method call

  // To call method startGame
  app.startGame();

  // Check that the startGameLoop method was called
  expect( appSpy ).toHaveBeenCalled();
  console.log( 'Pass: startGameLoop was called during startGame execution.' )
} );  


test( "Verify that whoHasWonOnGameOver is called when startGame is invoked", () => {
  // Create a spy on the startGameLoop method
  const appSpy = vi.spyOn( App.prototype, 'whoHasWonOnGameOver' );

  // Create an instance of the App class
  const app = new App(); 

  // To call method startGame
  app.startGame();

  // Check that the whoHasWonOnGameOver method was called
  expect( appSpy ).toHaveBeenCalled();
  console.log( 'Pass: whoHasWonOnGameOver was called during startGame execution.' )
} ); 
