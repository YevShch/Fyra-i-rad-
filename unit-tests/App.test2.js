import { test, expect, vi } from 'vitest';
import App from '../classes/App.js';
import Player from '../classes/Player.js';
import * as promptModule from '../helpers/prompt.js';
import Board from '../classes/Board';

// Mock the prompt function to simulate user input
vi.mock('../helpers/prompt.js', () => ({
    default: vi.fn(),
}));

test('should loop correctly to allow multiple games', () => {
    // Create an instance of App
    const app = new App();
    app.playerX = new Player('X', 'Player X');
    app.playerO = new Player('O', 'Player O');

    // Initialize the board
    app.board = new Board();

    // Mock the prompt to simulate user decisions
    const promptSpy = vi.spyOn(promptModule, 'default')
        .mockImplementationOnce(() => '2')  // Simulate a valid move for the first game
        .mockImplementationOnce(() => '2')  // Simulate a valid move for the second game
        .mockImplementationOnce(() => 'nej');  // Simulate 'no' to end the loop

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

    // Implement a simple version of startGame for testing
    const startGameSpy = vi.spyOn(app, 'startGame').mockImplementation(() => {
        let playAgain = 'ja';
        while (playAgain === 'ja') {
            app.startGameLoop();
            playAgain = promptModule.default('Vill ni spela igen? (ja/nej)? ');
        }
    });

    // Call startGame
    app.startGame();

    // Assertions
    expect(promptSpy).toHaveBeenCalledTimes(3);  // Two moves and one play-again prompt
    expect(promptSpy).toHaveBeenCalledWith('Vill ni spela igen? (ja/nej)? ');
    expect(startGameSpy).toHaveBeenCalled();
    expect(makeMoveSpy).toHaveBeenCalledTimes(2);  // Two moves
    expect(renderSpy).toHaveBeenCalledTimes(2);    // Render after each valid move

    // Restore mocks
    promptSpy.mockRestore();
    makeMoveSpy.mockRestore();
    renderSpy.mockRestore();
    startGameSpy.mockRestore();
});
