import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../classes/App.js';
import Player from '../classes/Player.js';

describe('App createPlayers Method', () => {
    let app;

    beforeEach(() => {
        app = Object.create(App.prototype);
        vi.spyOn(console, 'clear').mockImplementation(() => {}); 
        global.prompt = vi.fn(); 
    });

    it('should clear the console', () => {
        app.createPlayers();
        expect(console.clear).toHaveBeenCalled();
    });

    it('should prompt the user for player names', () => {
        global.prompt.mockImplementationOnce(() => 'Alice')
                      .mockImplementationOnce(() => 'Bob');
        app.createPlayers();
        expect(global.prompt).toHaveBeenCalledWith('Spelare X:s namn: ');
        expect(global.prompt).toHaveBeenCalledWith('Spelare O:s namn: ');
    });

    it('should store the player names and colors correctly', () => {
        global.prompt
            .mockImplementationOnce(() => 'Alice') 
            .mockImplementationOnce(() => 'Bob');  

        app.createPlayers();

        expect(app.playerX.name).toBe('Alice');
        expect(app.playerX.color).toBe('X');

        expect(app.playerO.name).toBe('Bob');
        expect(app.playerO.color).toBe('O');
    });
});
