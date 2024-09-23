import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import App from '../classes/App.js';

// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test("Test the performance of a DumbBot by comparing it to an external AI at levels 7 to 10", async () => {

  let { body } = getDocument();

  // Set the player names and types: DumbBot vs External AI
  globalThis.mockAnswers = ['DumbBot', 'A dumb bot', 'AI', 'External AI'];
  let app = new App();

  try {
    await waitUntil(() => app.namesEntered, 500);
    console.log('Names entered.');
  } catch (error) {
    console.error('Error waiting for namesEntered:', error);
  }

  // Waiting until there is no longer a <p> element with the text 'Waiting for player names...'
  try {
    await waitUntil(() =>
      !body.querySelector('main p').innerText.includes('Waiting for player names...'), 500
    );
    console.log('Player names are no longer being requested.');
  } catch (error) {
    console.error('Error waiting for player names:', error);
  }

  // Ensure that both players are created
  expect(app.playerRed).toBeDefined();
  expect(app.playerYellow).toBeDefined();
  expect(app.playerRed.name).toBe('DumbBot');
  expect(app.playerYellow.name).toBe('AI');

  // Test against External AI at levels 7 to 10
  for (let level = 7; level <= 10; level++) {
    console.log(`Testing External AI at level ${level}...`);
    globalThis.aiLevel = level;

    // Initialize a new game round
    for (let i = 0; i < 2; i++) {

      // Alternating turns between DumbBot and External AI until the game ends
      let gameOver = this.gameOver;
      while (!gameOver) {
        // Checking for the winning message
        try {
          await waitUntil(() => body.querySelector('main p').textContent.includes('won!'), 50);
          const winningMessage = body.querySelector('main p').innerText;
          expect(winningMessage).toContain('won!');
          console.log('Winning message is shown:', winningMessage);
          gameOver = true;
        } catch (error) {
          // If no winner is found, continue the game
          console.log('No winner yet, continuing...');
        }
      }

      // Simulate clicking the 'Play Again' button after each round
      mockAnswers = ['OK'];

      await waitUntil(() => body.querySelector('.button[onclick="playAgain()"]'), 500);
      let playAgainBtn = body.querySelector('.button[onclick="playAgain()"]');
      expect(playAgainBtn).toBeDefined();
      click(playAgainBtn);
    }
  }
}, 100000);
