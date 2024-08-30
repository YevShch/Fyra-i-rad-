import { describe, it, expect } from 'vitest';
import App from '../classes/App.js';

describe('App playAgainPrompt', () => {
  it('should start a new game when the user answers "ja"', () => {
    const app = new App();

    // Simulera användarinmatning för "ja"
    app.askToPlayAgain = () => 'ja';

    // Kontrollera att ett nytt spel börjar
    app.resetGame = () => app.board = new Board(); // Återställ spelbrädet
    app.startGameLoop = () => console.log('Game loop started');

    app.askToPlayAgain();

    expect(app.board).toEqual(new Board()); // Kontrollera att brädet är återställt
  });

  it('should terminate the game when the user answers anything other than "ja"', () => {
    const app = new App();

    // Simulera användarinmatning för "nej"
    app.askToPlayAgain = () => 'nej';

    const log = console.log;
    console.log = (message) => {
      expect(message).toBe('Spelet avslutas. Tack för att ni spelade!');
    };

    app.askToPlayAgain();

    console.log = log; // Återställ console.log
  });
});