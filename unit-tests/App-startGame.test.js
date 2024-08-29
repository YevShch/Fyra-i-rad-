import { test, expect, vi } from 'vitest';
import { setMockAnswers } from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';
import Board from '../classes/Board.js';


test( "Verify that startGame method initializes the game correctly", () => {
  setMockAnswers( 'PlayerX', 'PlayerO', '1', 'nej' )

  const appSpyCreatePlayers = vi.spyOn( App.prototype, 'createPlayers' ).mockImplementation( () => { } );
  const appSpyStartGameLoop = vi.spyOn( App.prototype, 'startGameLoop' ).mockImplementation( () => { } );
  const appSpyWhoHasWonOnGameOver = vi.spyOn( App.prototype, 'whoHasWonOnGameOver' ).mockImplementation( () => { } );
  // vi.spyOn( Board.prototype, 'constructor' ).mockImplementation( () => { } );
  const boardSpy = vi.spyOn( Board.prototype, 'constructor' ).mockImplementation( () => { } );


  const app = new App;

  app.startGame();

  expect( appSpyCreatePlayers ).toHaveBeenCalled();
  console.log( "Pass: createPlayers() is called when startGame() is invoked" )

  expect( appSpyStartGameLoop ).toHaveBeenCalled();
  console.log( "Pass: startGameLoop() is called when startGame() is invoked" )

  expect( appSpyWhoHasWonOnGameOver ).toHaveBeenCalled();
  console.log( "Pass: whoHasWonOnGameOver() is called when startGame() is invoked" )

  expect( app.board ).toBeInstanceOf( Board );
  console.log( "Pass: app.board is an instance of Board" );
  // expect( boardSpy ).toHaveBeenCalled();
} )
