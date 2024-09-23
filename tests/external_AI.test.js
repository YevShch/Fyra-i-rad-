import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import App from '../classes/App.js';

// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test( "Test the performance of a smart bot by comparing it to an external AI at level 1", async () => {

 
    let { body } = getDocument();

    globalThis.mockAnswers = [ 'Smarty', 'A smart bot', 'AI', 'External AI' ];
  let app = new App();   

  try {
    await waitUntil( () => app.namesEntered, 500 );
    console.log( 'Names entered.' );
  } catch ( error ) {
    console.error( 'Error waiting for namesEntered:', error );
  }

  // Waiting until there is no longer a <p> element with the text 'Waiting for player names...'
  try {
    await waitUntil( () =>
      !body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ), 500
    );
    console.log( 'Player names are no longer being requested.' );
  } catch ( error ) {
    console.error( 'Error waiting for player names:', error );
  }

  // Ensure that both players are created
  expect( app.playerRed ).toBeDefined();
  expect( app.playerYellow ).toBeDefined();
  expect( app.playerRed.name ).toBe( 'Smarty' );
  expect( app.playerYellow.name ).toBe( 'AI' );
  
    // Initialize AI Level for the test
    globalThis.aiLevel = 1;

  for ( let i = 0; i < 2; i++ ) {
    
    // Waiting for player names to be entered
   

    // Alternating turns between players until someone wins
    let gameOver = this.gameOver;
    while ( !gameOver ) {

      // Checking for the winning message
      try {
        await waitUntil( () => body.querySelector( 'main p' ).textContent.includes( 'won!' ), 50 );
        const winningMessage = body.querySelector( 'main p' ).innerText;
        expect( winningMessage ).toContain( 'won!' );
        console.log( 'Winning message is shown:', winningMessage );
        gameOver = true;
      } catch ( error ) {
        // If no winning message is found, continue the game
        console.log( 'No winner yet, continuing...' );
      }

    }

    mockAnswers = [ 'OK' ];

    await waitUntil( () => body.querySelector( '.button[onclick="playAgain()"]' ), 500 );
    let playAgainBtn = body.querySelector( '.button[onclick="playAgain()"]' );
    expect( playAgainBtn ).toBeDefined();
    click( playAgainBtn );
  }
  

}, 100000 ); 







