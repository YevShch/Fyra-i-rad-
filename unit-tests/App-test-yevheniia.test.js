import { test, expect, vi } from 'vitest';
import {
    promptQuestions,
    setMockAnswers,
} from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';
import Player from '../classes/Player.js'

test( "should clear the console (Check that createPlayers method clears console  before creating of players)", () => {
    const app = new App();

    // Spy on the call to console.clear
    const consoleClearSpy = vi.spyOn( console, 'clear' );
    
    //Call the function createPlayers
    app.createPlayers();

    // Check that console.clear has been called
    expect( consoleClearSpy ).toHaveBeenCalled();

} );
  

test( " should prompt the user for player names (Check that createPlayers method prompts the user for player names) ", () => {
    // Set mock answers
    setMockAnswers( 'Anna', 'Ola' );

    // Create an instance of the App class, which calls createPlayers
    const app = new App();

    // Call the createPlayers method directly
    app.createPlayers();

    // Check that the promptQuestions array contains both questions
    expect( promptQuestions ).toContain( 'Spelare X:s namn: ' );
    expect( promptQuestions ).toContain( 'Spelare O:s namn: ' );
} );


test( "should store the player names and colors correctly (Check that createPlayers() stores player's names and colors correctly ) ", () => {
    // Set mock answers for the prompts
    setMockAnswers( 'Anna', 'Ola' );

    // Create an instance of the App class
    let appInstance = new App();

    // Check that the correct prompt questions were asked
    expect( promptQuestions[ 0 ] ).toBe( 'Spelare X:s namn: ' );
    expect( promptQuestions[ 1 ] ).toBe( 'Spelare O:s namn: ' );

    // Verify that playerX and playerO are correctly created
    expect( appInstance.playerX ).toBeInstanceOf( Player );
    expect( appInstance.playerX.name ).toBe( 'Anna' );
    expect( appInstance.playerX.color ).toBe( 'X' );

    expect( appInstance.playerO ).toBeInstanceOf( Player );
    expect( appInstance.playerO.name ).toBe( 'Ola' );
    expect( appInstance.playerO.color ).toBe( 'O' );
} );



