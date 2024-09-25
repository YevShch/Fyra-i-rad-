import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import App from '../classes/App.js';

// Minimize the sleep duration (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test("Test if Smart Bot always wins against Dumb Bot", async () => {
  let { body } = getDocument();

  // Set player names and types: Smart Bot vs Dumb Bot
  globalThis.mockAnswers = ['SmartBot', 'A smart bot', 'DumbBot', 'A dumb bot'];
  let app = new App();

  try {
    await waitUntil(() => app.namesEntered, 500);
    console.log('Names entered.');
  } catch (error) {
    console.error('Error while waiting for namesEntered:', error);
  }

  // Check if the "Waiting for player names..." message has disappeared
  try {
    await waitUntil(() =>
      !body.querySelector('main p').innerText.includes('Waiting for player names...'), 500
    );
    console.log('Player names successfully received.');
  } catch (error) {
    console.error('Error while waiting for player names:', error);
  }

  // Ensure the players are correctly created
  expect(app.playerRed).toBeDefined();
  expect(app.playerYellow).toBeDefined();
  expect(app.playerRed.name).toBe('SmartBot');
  expect(app.playerYellow.name).toBe('DumbBot');

  // Play 3 matches between Smart Bot and Dumb Bot
  for (let match = 1; match <= 3; match++) {
    console.log(`\n=== Match ${match} starts ===`);

    let gameOver = false;

    // Players take turns making moves until the game is over
    while (!gameOver) {
      // Loop through moves
      try {
        await waitUntil(() => body.querySelector('main p').textContent.includes('won!'), 50);
        const winningMessage = body.querySelector('main p').innerText;
        console.log('Winning message:', winningMessage);

        // Ensure Smart Bot is the winner
        expect(winningMessage).toContain('SmartBot won!');
        console.log(`Match ${match}: Smart Bot won.`);
        gameOver = true; // The game is over
      } catch (error) {
        // If there's no winner yet, continue the game
        console.log('No winner yet, game continues...');
      }
    }

    // After the match ends, click the "Play Again" button to start a new game
    globalThis.mockAnswers = ['OK'];
    await waitUntil(() => body.querySelector('.button[onclick="playAgain()"]'), 500);
    let playAgainBtn = body.querySelector('.button[onclick="playAgain()"]');
    expect(playAgainBtn).toBeDefined();
    click(playAgainBtn); // Clicks the "Play Again" button
  }

  console.log('\nAll matches are over, Smart Bot won all matches.');
}, 100000);
