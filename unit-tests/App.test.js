import { describe, it, expect, vi } from 'vitest';
import App from '../classes/App.js';


// Mock the prompt function
vi.mock('../helpers/prompt.js', () => ({
    default: vi.fn()
        .mockReturnValueOnce('Alice')  // First call returns 'Alice'
        .mockReturnValueOnce('Bob')    // Second call returns 'Bob'
}));

describe('App', () => {
    it('should correctly prompt for player names and assign them to playerX and playerO', () => {
        const app = new App();
        app.createPlayers();

        expect(app.playerX.name).toBe('Alice');
        expect(app.playerO.name).toBe('Bob');
    });
});
