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

  // Initialize AI Level for the test
  globalThis.aiLevel = 1;

  let app = new App();

  // Counter for smart bot's wins
  let smartBotWins = 0;
  let totalGamesWithWin = 0; // Tracks only games with a win (not draws)
  let totalDraws = 0; // Tracks the total number of draws

  // Waiting for player names to be entered
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

 

  // Continue running games until 10 non-draw games are completed
  while ( totalGamesWithWin < 10 ) {
    // Alternating turns between players until someone wins
    let gameOver = false;
    while ( !gameOver ) {
      // Waiting for a win or draw message
      await waitUntil( () => {
        const message = body.querySelector( 'main p' ).textContent;
        return message.includes( 'won!' ) || message.includes( "It's a tie" );
      }, 50 );

      const gameOverMessage = body.querySelector( 'main p' ).innerText;

      if ( gameOverMessage.includes( 'won!' ) || gameOverMessage.includes( "It's a tie" ) ) {
        console.log( 'Game over message is shown:', gameOverMessage );
        gameOver = true;

        // Checking who won
        if ( gameOverMessage.includes( 'Smarty won!' ) ) {
          smartBotWins += 1;
          totalGamesWithWin += 1; // Count this as a completed game with a win
        } else if ( gameOverMessage.includes( 'AI won!' ) ) {
          totalGamesWithWin += 1; // Count this as a completed game with a win
        } else if ( gameOverMessage.includes( "It's a tie..." ) ) {
          totalDraws += 1;
          console.log( 'Game ended in a draw. Not counting this game towards total wins.' );
        }
      } else {
        // If no win or draw message is shown, continue
      }
    }

    // Mock answer to click OK button after "Replay" button
    mockAnswers = [ 'OK' ];

    // Click Replay button to continue a game
    await waitUntil( () => body.querySelector( '.button[onclick="playAgain()"]' ), 500 );
    let playAgainBtn = body.querySelector( '.button[onclick="playAgain()"]' );
    expect( playAgainBtn ).toBeDefined();
    click( playAgainBtn );
  }

  console.log( "Total smart bot wins:", smartBotWins );
  console.log( "Total draws (not counted in games):", totalDraws );

  // Check that the smart bot won at least 5 times in the 10 valid games (excluding draws)
  expect( smartBotWins ).toBeGreaterThanOrEqual( 5 );
  console.log( "PASS: Smart bot won at least 5 times in 10 valid games (excluding draws) and its performance is better than the external AI at level 1." );

}, 500000 );
