import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import App from '../classes/App.js';

// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test("Test the performance of a DumbBot by comparing it to an external AI at levels 4 to 6", async () => {

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
  let totalAIWins = 0;

  // Run multiple rounds for AI levels 4-6
  for (let aiLevel = 4; aiLevel <= 6; aiLevel++) {
    globalThis.aiLevel = aiLevel;
    let dumbBotWins = 0;
    let aiWins = 0;
    let draws = 0;

    console.log(`Testing AI Level: ${aiLevel}`);

    // Run 3 games for each AI level
    for (let gameCount = 1; gameCount < 4; gameCount++) {
      let gameOver = false;
      while (!gameOver) {
        try {
          await waitUntil(() => body.querySelector('main p').textContent.includes('won!'), 50);
          const winningMessage = body.querySelector('main p').innerText;
          console.log('Winning message is shown:', winningMessage);

          // Check who won the match
          if (winningMessage.includes('DumbBot')) {
            dumbBotWins++;
            console.log(`Match ${gameCount}: DumbBot won.`);
          } else if (winningMessage.includes('AI')) {
            aiWins++;
            totalAIWins++;
            console.log(`Match ${gameCount}: AI won.`);
          }
          gameOver = true;
        } catch (error) {
          // No winner yet, continue the game
          console.log('No winner yet, continuing...');
        }
      }

      // Restart game
      mockAnswers = ['OK'];
      await waitUntil(() => body.querySelector('.button[onclick="playAgain()"]'), 5000);
      let playAgainBtn = body.querySelector('.button[onclick="playAgain()"]');
      expect(playAgainBtn).toBeDefined();
      click(playAgainBtn);
    }

    // Output results for the current AI level
    console.log(`Results for AI Level ${aiLevel}:`);
    console.log(`DumbBot Wins: ${dumbBotWins}`);
    console.log(`AI Wins: ${aiWins}`);
    console.log(`Draws: ${draws}`);

    // Add an expectation for the results (modify according to expected behavior)
    expect(dumbBotWins + aiWins + draws).toBe(3); // All games should be accounted for
  }
}, 100000);
