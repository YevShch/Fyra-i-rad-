import App from '../classes/App.js';
import Board from '../classes/Board.js'; 
import { describe, it, vi, expect, beforeAll, afterAll } from 'vitest';
import { mockPrompt, mockConsoleLog, restorePromptAndConsoleLog } from './helpers/mockPromptAndConsoleLog.js';

describe('App', () => {
    let MockBoard;

    beforeAll(() => {
        // Mock the prompt and console.log functions
        mockPrompt();
        mockConsoleLog();

        // Mock the Board class
        MockBoard = vi.fn(Board);
    });

    afterAll(() => {
        // Restore the original prompt and console.log functions
        restorePromptAndConsoleLog();
    });

    it('should initialize the game correctly', () => {
        // Initialize the App class
        const app = new App();

        // Assert createPlayers is called (mockPrompt handles this)
        expect(mockPrompt).toHaveBeenCalled();

        // Assert Board is instantiated
        expect(MockBoard).toHaveBeenCalled();

        // Assert startGameLoop is called
        expect(app.startGameLoop).toHaveBeenCalled();

        // Assert whoHasWonOnGameOver is called
        expect(app.whoHasWonOnGameOver).toHaveBeenCalled();
    });
});
