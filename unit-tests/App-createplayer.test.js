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
