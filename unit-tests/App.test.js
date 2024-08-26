import { test, expect, vi } from 'vitest';
import { promptQuestions, setMockAnswers, } from './helpers/prompt.js';
import App from '../classes/App.js';
import Player from '../classes/Player.js';

test("should prompt the current player for a move and update the board correctly", () => {
    const playerX = new Player('X', 'Player X');
    const playerO = new Player('O', 'Player O');
    
    const app = new App(playerX, playerO);

    // Mock the prompt to simulate a valid move input
    const promptSpy = vi.spyOn(global, 'prompt').mockReturnValue('3');

    // Spy on makeMove and render methods
    const makeMoveSpy = vi.spyOn(app.board, 'makeMove').mockReturnValue(true);
    const renderSpy = vi.spyOn(app.board, 'render');

    // Call the startGameLoop method directly
    app.startGameLoop();

    // Check that prompt was called
    expect(promptSpy).toHaveBeenCalledWith(`Ange ditt drag X Player X - skriv in kolumn: `);
    
    // Check that makeMove was called with correct arguments
    expect(makeMoveSpy).toHaveBeenCalledWith('X', 2);
    
    // Check that render was called after a valid move
    expect(renderSpy).toHaveBeenCalled();
    
    // Check that the turn has changed
    expect(app.board.currentPlayerColor).toBe('O');

    // Restore the original implementations
    promptSpy.mockRestore();
    makeMoveSpy.mockRestore();
    renderSpy.mockRestore();
});

test("should not update the board or change turn on an invalid move", () => {
    const playerX = new Player('X', 'Player X');
    const playerO = new Player('O', 'Player O');
    
    const app = new App(playerX, playerO);

    // Mock the prompt to simulate an invalid move input
    const promptSpy = vi.spyOn(global, 'prompt').mockReturnValue('5');

    // Spy on makeMove and render methods
    const makeMoveSpy = vi.spyOn(app.board, 'makeMove').mockReturnValue(false);
    const renderSpy = vi.spyOn(app.board, 'render');

    // Call the startGameLoop method directly
    app.startGameLoop();

    // Check that prompt was called
    expect(promptSpy).toHaveBeenCalledWith(`Ange ditt drag X Player X - skriv in kolumn: `);
    
    // Check that makeMove was called with correct arguments
    expect(makeMoveSpy).toHaveBeenCalledWith('X', 4);
    
    // Check that render was not called after an invalid move
    expect(renderSpy).not.toHaveBeenCalled();
    
    // Check that the turn has not changed
    expect(app.board.currentPlayerColor).toBe('X');

    // Restore the original implementations
    promptSpy.mockRestore();
    makeMoveSpy.mockRestore();
    renderSpy.mockRestore();
});
