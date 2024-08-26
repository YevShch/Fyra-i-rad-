import { describe, it, expect, vi } from 'vitest';
import App from '../classes/App.js';
import Board from '..classes/Board.js';
import Player from '../classes/Player.js';

// Mock classes
class MockBoard {
    constructor() {
        this.gameOver = false;
        this.currentPlayerColor = 'X';
        this.winner = null;
    }

    makeMove() {
        return true; // Simulate a successful move
    }

    render() {
        // No operation for rendering in test
    }
}

class MockPlayer {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

describe('App', () => {
    it('should initialize the game correctly', () => {
        const mockPrompt = vi.fn()
            .mockReturnValueOnce('Player X')  // Name for Player X
            .mockReturnValueOnce('Player O')  // Name for Player O
            .mockReturnValueOnce('ja');       // Play again response

        // Spy on methods
        const createPlayers = vi.spyOn(App.prototype, 'createPlayers').mockImplementation(() => {});
        const startGameLoop = vi.spyOn(App.prototype, 'startGameLoop').mockImplementation(() => {});
        const whoHasWonOnGameOver = vi.spyOn(App.prototype, 'whoHasWonOnGameOver').mockImplementation(() => {});

        // Mock Board class
        vi.mock('./Board.js', () => ({
            default: MockBoard
        }));

        // Create an instance of App
        new App(mockPrompt);

        // Assert createPlayers is called
        expect(createPlayers).toHaveBeenCalled();

        // Assert Board is instantiated
        expect(MockBoard).toBeCalled();

        // Assert startGameLoop is called
        expect(startGameLoop).toHaveBeenCalled();

        // Assert whoHasWonOnGameOver is called
        expect(whoHasWonOnGameOver).toHaveBeenCalled();
    });
});
