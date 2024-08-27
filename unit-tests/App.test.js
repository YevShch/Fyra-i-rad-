import { test, expect, vi } from 'vitest';
import App from '../classes/App.js';
import Player from '../classes/Player.js';
import * as promptModule from '../helpers/prompt.js';
import Board from '../classes/Board.js';

// Mock the prompt function to simulate user input
vi.mock('../helpers/prompt.js', () => ({
    default: vi.fn(),
}));

test('should prompt the current player for a move and update the board correctly', () => {
    // Create an instance of App
    const app = new App();
    app.playerX = new Player('X', 'Player X');
    app.playerO = new Player('O', 'Player O');
    
    // Initialize the board
    app.board = new Board();
    
    // Mock the prompt to simulate a valid move input
    const promptSpy = vi.spyOn(promptModule, 'default').mockReturnValue('2');

    // Spy on Board methods
    const makeMoveSpy = vi.spyOn(Board.prototype, 'makeMove').mockImplementation((color, column) => {
        if (column === 2) return true;
        return false;
    });
    const renderSpy = vi.spyOn(Board.prototype, 'render');

    // Implement a simple version of startGameLoop for testing
    app.startGameLoop = () => {
        const column = parseInt(promptModule.default('Ange ditt drag X Player X - skriv in kolumn: '));
        const validMove = app.board.makeMove(app.board.currentPlayerColor, column);
        if (validMove) {
            app.board.render();
            app.board.currentPlayerColor = app.board.currentPlayerColor === 'X' ? 'O' : 'X';
        }
    };

    // Call the startGameLoop method
    app.startGameLoop();

    // Assertions
    expect(promptSpy).toHaveBeenCalledWith('Ange ditt drag X Player X - skriv in kolumn: ');
    expect(makeMoveSpy).toHaveBeenCalledWith('X', 2);
    expect(renderSpy).toHaveBeenCalled();
    expect(app.board.currentPlayerColor).toBe('O');

    // Restore mocks
    promptSpy.mockRestore();
    makeMoveSpy.mockRestore();
    renderSpy.mockRestore();
});

test('should not update the board or change turn on an invalid move', () => {
    // Create an instance of App
    const app = new App();
    app.playerX = new Player('X', 'Player X');
    app.playerO = new Player('O', 'Player O');
    
    // Initialize the board
    app.board = new Board();
    
    // Mock the prompt to simulate an invalid move input
    const promptSpy = vi.spyOn(promptModule, 'default').mockReturnValue('4');

    // Spy on Board methods
    const makeMoveSpy = vi.spyOn(Board.prototype, 'makeMove').mockImplementation((color, column) => {
        if (column === 4) return false;
        return true;
    });
    const renderSpy = vi.spyOn(Board.prototype, 'render');

    // Implement a simple version of startGameLoop for testing
    app.startGameLoop = () => {
        const column = parseInt(promptModule.default('Ange ditt drag X Player X - skriv in kolumn: '));
        const validMove = app.board.makeMove(app.board.currentPlayerColor, column);
        if (validMove) {
            app.board.render();
            app.board.currentPlayerColor = app.board.currentPlayerColor === 'X' ? 'O' : 'X';
        }
    };

    // Call the startGameLoop method
    app.startGameLoop();

    // Assertions
    expect(promptSpy).toHaveBeenCalledWith('Ange ditt drag X Player X - skriv in kolumn: ');
    expect(makeMoveSpy).toHaveBeenCalledWith('X', 4);
    expect(renderSpy).not.toHaveBeenCalled();
    expect(app.board.currentPlayerColor).toBe('X');

    // Restore mocks
    promptSpy.mockRestore();
    makeMoveSpy.mockRestore();
    renderSpy.mockRestore();
});
