// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import App from '../classes/App.js';
// import Player from '../classes/Player.js';

import { test, expect, vi } from 'vitest';
import App from './App.js';
import Player from './Player.js';
import prompt from '../helpers/prompt.js';

// Mock the prompt function to simulate user input
vi.mock( '../helpers/prompt.js', () => ( {
    default: vi.fn(),
} ) );

test( 'createPlayers correctly assigns player names to this.playerX and this.playerO', () => {
    // Set the values that prompt will return on each call
    prompt
        .mockImplementationOnce( () => 'Alice' )
        .mockImplementationOnce( () => 'Bob' )
        // Subsequent prompt calls for the startGameLoop method and others
        .mockImplementation( () => 'nej' ); // To exit the infinite loop in the constructor

    // Create an instance of the App class
    const app = new App();

    // Check that playerX and playerO are correctly created
    expect( app.playerX ).toBeInstanceOf( Player );
    expect( app.playerX.name ).toBe( 'Alice' );
    expect( app.playerX.color ).toBe( 'X' );

    expect( app.playerO ).toBeInstanceOf( Player );
    expect( app.playerO.name ).toBe( 'Bob' );
    expect( app.playerO.color ).toBe( 'O' );
} );



// describe('App createPlayers Method', () => {
//     let app;

//     beforeEach(() => {
//         app = Object.create(App.prototype);
//         vi.spyOn(console, 'clear').mockImplementation(() => {}); 
//         global.prompt = vi.fn(); 
//     });

//     it('should clear the console', () => {
//         app.createPlayers();
//         expect(console.clear).toHaveBeenCalled();
//     });

//     it('should prompt the user for player names', () => {
//         global.prompt.mockImplementationOnce(() => 'Alice')
//                       .mockImplementationOnce(() => 'Bob');
//         app.createPlayers();
//         expect(global.prompt).toHaveBeenCalledWith('Spelare X:s namn: ');
//         expect(global.prompt).toHaveBeenCalledWith('Spelare O:s namn: ');
//     });

//     it('should store the player names and colors correctly', () => {
//         global.prompt
//             .mockImplementationOnce(() => 'Alice') 
//             .mockImplementationOnce(() => 'Bob');  

//         app.createPlayers();

//         expect(app.playerX.name).toBe('Alice');
//         expect(app.playerX.color).toBe('X');

//         expect(app.playerO.name).toBe('Bob');
//         expect(app.playerO.color).toBe('O');
//     });
// });
