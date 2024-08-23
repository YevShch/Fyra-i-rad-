import { test, expect } from 'vitest';
import {
  promptQuestions,
  consoleOutput,
  setMockAnswers,
  log
} from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';



// 2. Test that the createPlayers method correctly prompts for player names and assigns them to this.playerX and this.playerO.
// - The App should ask player X and player O for name
// - check that player X has gott name "Anna" and player O - "Ola"
//

test( "Test that the createPlayers method correctly prompts for player names and assigns them to this.playerX and this.playerO", () => {
  // Set mock answers for the prompts
  setMockAnswers( 'Anna', 'Ola' );
  // promptQuestions( 'Spelare X: s namn: ', 'Spelare O:s namn: ' );

  // Create an instance of the App class
  let appInstance = new App();

  // // Check that the correct prompt questions were asked
  // expect( promptQuestions[ 0 ] ).toBe( 'Spelare X: s namn: ' );
  // expect( promptQuestions[ 1 ] ).toBe( 'Spelare O:s namn: '  );

  // Verify that playerX and playerO are correctly created
  expect( appInstance.playerX ).toBeInstanceOf( Player );
  expect( appInstance.playerX.name ).toBe( 'Anna' );
  expect( appInstance.playerX.color ).toBe( 'X' );

  expect( appInstance.playerO ).toBeInstanceOf( Player );
  expect( appInstance.playerO.name ).toBe( 'Ola' );
  expect( appInstance.playerO.color ).toBe( 'O' );
} );
/*
test( 'The App should ask for name and age', () => {
  // the answers we want to give when the program calls prompt
  setMockAnswers( 'Anna', '35' );
  // create an instance of App
  let app = new App();
  // check that the program asks the correct questions when calling prompt
  expect( promptQuestions[ 0 ] ).toBe( 'Hej! Vad heter du? ' );
  expect( promptQuestions[ 1 ] ).toBe( 'Hur gammal är du? ' );
  // call the sayHi method of the person the app creates and check the return value
  expect( app.person.sayHi() ).toBe( 'Hej! Jag heter Anna och är 35 år gammal!' );
  // check that the console.log output the program gives is correct
  // (note: since console.log can be called with several arguments
  // each call to console.log is stored as an array)
  expect( consoleOutput[ 0 ][ 0 ] ).toBe( '\nHej! Jag heter Anna och är 35 år gammal!' );
  // we can still console.log things if we need to, although we mocked console.log
  // since we saved to original console.log function in the variable log
  log( 'The test has run!' );
} );
*/
