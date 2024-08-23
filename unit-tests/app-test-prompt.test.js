import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';
import Player from '../classes/Player.js'


// 2. Test that the createPlayers method correctly prompts for player names and assigns them to this.playerX and this.playerO.
// - The App should ask player X and player O for name
// - check that player X has gott name "Anna" and player O - "Ola"
//

test( "Test that the createPlayers method correctly prompts for player names and assigns them to this.playerX and this.playerO", () => {
  // Set mock answers for the prompts
  setMockAnswers( 'Anna', 'Ola' );

  // Create an instance of the App class
  let appInstance = new App();

  // Check that the correct prompt questions were asked
  expect( promptQuestions[ 0 ] ).toBe( 'Spelare X:s namn: ' );
  expect( promptQuestions[ 1 ] ).toBe( 'Spelare O:s namn: '  );

  // Verify that playerX and playerO are correctly created
  expect( appInstance.playerX ).toBeInstanceOf( Player );
  expect( appInstance.playerX.name ).toBe( 'Anna' );
  expect( appInstance.playerX.color ).toBe( 'X' );

  expect( appInstance.playerO ).toBeInstanceOf( Player );
  expect( appInstance.playerO.name ).toBe( 'Ola' );
  expect( appInstance.playerO.color ).toBe( 'O' );
} );

