import { describe, it, expect, vi } from 'vitest';
import App from '../classes/App.js';

describe('App', () => {
  it('should start a new game when the user answers "ja"', () => {
    const app = new App();
    const mockPrompt = vi.spyOn(global, 'prompt').mockReturnValue('ja');
    const mockResetGame = vi.spyOn(app, 'resetGame').mockImplementation(() => { });
    const mockStartGameLoop = vi.spyOn(app, 'startGameLoop').mockImplementation(() => { });

    app.playAgainPrompt();

    expect(mockPrompt).toHaveBeenCalledWith("Vill du spela igen? (ja/nej)");
    expect(mockResetGame).toHaveBeenCalled();
    expect(mockStartGameLoop).toHaveBeenCalled();

    mockPrompt.mockRestore();
    mockResetGame.mockRestore();
    mockStartGameLoop.mockRestore();
  });

  it('should terminate the game when the user answers anything other than "ja"', () => {
    const app = new App();
    const mockPrompt = vi.spyOn(global, 'prompt').mockReturnValue('nej');
    const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => { });

    app.playAgainPrompt();

    expect(mockPrompt).toHaveBeenCalledWith("Vill du spela igen? (ja/nej)");
    expect(mockExit).toHaveBeenCalled();

    mockPrompt.mockRestore();
    mockExit.mockRestore();
  });
});