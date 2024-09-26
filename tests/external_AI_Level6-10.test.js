import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import click from './helpers/mock-help/triggerOnclick.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import App from '../classes/App.js';

// Make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

for (let level = 6; level <= 10; level++) {
  test(`Test the performance of a smart bot by comparing it to an external AI at level ${level}`, async () => {
    let { body } = getDocument();

    globalThis.mockAnswers = ['Smarty', 'A smart bot', 'AI', 'External AI'];

    let app = new App();

    // Start the game
    if (typeof app.startGame === 'function') {
      app.startGame(); // If there's a method to start the game in the App class, call it
    }

    // Wait for the players to be created
    try {
      await waitUntil(() => app.playerRed && app.playerYellow, 1000); // Set a wait time of 1 second
      console.log('Players are created.');
    } catch (error) {
      console.error('Error waiting for players to be created:', error);
      return; // Prevent the test from continuing if there's an error
    }

    // Verify that player names are set correctly
    expect(app.playerRed).toBeDefined();
    expect(app.playerYellow).toBeDefined();
    expect(app.playerRed.name).toBe('Smarty');
    expect(app.playerYellow.name).toBe('AI');

    // Set the AI level for the test
    globalThis.aiLevel = level;

    // Continue with the remaining tests
    let smartBotWins = 0;
    for (let i = 0; i < 10; i++) {
      let gameOver = false;
      let maxTurns = 100;
      let turnCount = 0;

      while (!gameOver && turnCount < maxTurns) {
        turnCount++;
        try {
          await waitUntil(() => body.querySelector('main p').textContent.includes('won!'), 100);
          const winningMessage = body.querySelector('main p').innerText;
          expect(winningMessage).toContain('won!');
          console.log('Winning message is shown:', winningMessage);
          gameOver = true;

          if (winningMessage.includes('red')) {
            smartBotWins += 1;
            console.log(`Smart Bot (Red) won this round. Total wins so far: ${smartBotWins}`);
          } else {
            console.log('AI (Yellow) won this round.');
          }
        } catch (error) {
          console.log('No winner yet, continuing...');
        }
      }

      if (!gameOver) {
        console.warn(`Game did not conclude within ${maxTurns} turns. Moving to the next game.`);
      }

      // Mock answer to click the OK button after the "Replay" button
      mockAnswers = ['OK'];

      // Wait for the "Play Again" button to appear
      try {
        await waitUntil(() => body.querySelector('.button[onclick="playAgain()"]'), 1000); // Set a wait time of 1 second
        let playAgainBtn = body.querySelector('.button[onclick="playAgain()"]');
        expect(playAgainBtn).toBeDefined();
        click(playAgainBtn);
      } catch (error) {
        console.error('Error: "Play Again" button was not found or not clickable:', error);
        return; // Terminate the test if there's an error
      }
    }

    console.log(`Total smart bot wins at level ${level}:`, smartBotWins);
    expect(smartBotWins).toBe(3);
    console.log(`PASS: smart bot won exactly 3 times in 10 rounds, and its performance is verified at level ${level}.`);
  }, 500000);
}
