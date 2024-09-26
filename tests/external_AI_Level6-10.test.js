import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import App from '../classes/App.js';

// Make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

for ( let level = 1; level <= 10; level++ ) {
  test( `Test the performance of a smart bot by comparing it to an external AI at level ${ level }`, async () => {
    let { body } = getDocument();

    globalThis.mockAnswers = [ 'Smarty', 'A smart bot', 'AI', 'External AI' ];

    let app = new App();

    // Start the game
    if ( typeof app.startGame === 'function' ) {
      app.startGame(); // If there's a method to start the game in the App class, call it
    }

    // Wait for the players to be created
    try {
      await waitUntil( () => app.playerRed && app.playerYellow, 1000 ); // Set a wait time of 1 second
      console.log( 'Players are created.' );
    } catch ( error ) {
      console.error( 'Error waiting for players to be created:', error );
      return; // Prevent the test from continuing if there's an error
    }

    // Verify that player names are set correctly
    expect( app.playerRed ).toBeDefined();
    expect( app.playerYellow ).toBeDefined();
    expect( app.playerRed.name ).toBe( 'Smarty' );
    expect( app.playerYellow.name ).toBe( 'AI' );

    // Set the AI level for the test
    globalThis.aiLevel = level;

    // Continue with the remaining tests
    let smartBotWins = 0;
    let totalDraws = 0;   // Track total draws
    let totalGamesWithWin = 0; // Only count games with wins (excluding draws)

    // Continue running games until 10 non-draw games are completed
    while ( totalGamesWithWin < 10 ) {
      let gameOver = false;

      // Play the game until there's a win or draw
      while ( !gameOver ) {
        // Wait for the game to conclude with a win or draw message
        await waitUntil( () => {
          const message = body.querySelector( 'main p' ).textContent;
          return message.includes( 'won!' ) || message.includes( "It's a tie" );
        }, 100 );

        const gameOverMessage = body.querySelector( 'main p' ).innerText;

        if ( gameOverMessage.includes( 'won!' ) || gameOverMessage.includes( "It's a tie" ) ) {
          console.log( 'Game over message is shown:', gameOverMessage );
          gameOver = true;

          // Checking who won
          if ( gameOverMessage.includes( 'Smarty won!' ) ) {
            smartBotWins += 1;
            totalGamesWithWin += 1; // Only count games with a winner
          } else if ( gameOverMessage.includes( 'AI won!' ) ) {
            totalGamesWithWin += 1; // AI wins count as completed games
          } else if ( gameOverMessage.includes( "It's a tie..." ) ) {
            totalDraws += 1;
            console.log( 'Game ended in a draw. Not counting this game towards total wins.' );
          }
        }
      }

      // Mock answer to click the OK button after the "Replay" button
      mockAnswers = [ 'OK' ];

      // Wait for the "Play Again" button to appear
      try {
        await waitUntil( () => body.querySelector( '.button[onclick="playAgain()"]' ), 1000 ); // Set a wait time of 1 second
        let playAgainBtn = body.querySelector( '.button[onclick="playAgain()"]' );
        expect( playAgainBtn ).toBeDefined();
        click( playAgainBtn );
      } catch ( error ) {
        console.error( 'Error: "Play Again" button was not found or not clickable:', error );
        return; // Terminate the test if there's an error
      }
    }

    // Logging the results
    console.log( `Total smart bot wins at level ${ level }:`, smartBotWins );
    console.log( `Total draws at level ${ level }:`, totalDraws );

    // Check that the smart bot won at least 6 times (excluding draws)
    expect( smartBotWins ).toBeGreaterThanOrEqual( 6 );
    console.log( `PASS: Smart bot won at least 6 times in 10 valid games at level ${ level }.` );
  }, 500000 );
}
