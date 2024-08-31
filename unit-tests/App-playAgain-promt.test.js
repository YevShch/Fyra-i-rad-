import { test, expect, vi } from 'vitest';
import { setMockAnswers, promptQuestions } from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';


test( "Check that askToPlayAgain() asks players to play again", () => {
  // mock response to stop the game loop
  setMockAnswers( 'nej' );

  const app = new App;

  // Call the askToPlayAgain method
  app.askToPlayAgain();

  // Check that the promptQuestions array contains question
  expect( promptQuestions ).toContain( 'Vill ni spela igen? (ja/nej)? ' );
} );


test( "Check that askToPlayAgain() restarts the game loop when the user answers 'ja'", () => {
  // Mock responses to simulate two game loops:
  // 1. First game loop where 'Anna' and 'Ola' play and the game ends with 'Anna' winning.
  // 2. Second game loop starts after responding 'ja' to 'Vill ni spela igen?'.
  // 3. The second game loop ends with the answer 'nej' to the replay question.
  setMockAnswers(
    'ja',   // Answer 'ja' to the initial replay prompt
    'Anna', // Name for player X
    'Ola',  // Name for player O
    '1', '2', '1', '2', '1', '2', '1', // Moves leading to 'Anna' winning
    'ja',   // Answer 'ja' to play again
    'ja',   // Answer 'ja' to use same names
    '1', '2', '1', '2', '1', '2', '1', // Moves in the second game loop
    'nej'   // Answer 'nej' to end the game
  );

  const app = new App();

  // Spy on the startGameLoop and createPlayers methods
  const getStartGameLoopSpy = vi.spyOn( app, 'startGameLoop' );
  const getCreatePlayersSpy = vi.spyOn( app, 'createPlayers' );

  // Start the game loop
  app.startGame();

  // Check that createPlayers method was called twice:
  // 1. First when the game starts.
  // 2. Second when the replay starts.
  expect( getCreatePlayersSpy ).toBeCalledTimes( 2 );

  // Check that startGameLoop method was called twice:
  // 1. For the first game loop.
  // 2. For the second game loop after the 'ja' response.
  expect( getStartGameLoopSpy ).toBeCalledTimes( 2 );
} );

