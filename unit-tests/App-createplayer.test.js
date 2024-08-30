import { test, expect, vi } from 'vitest';
import {
    promptQuestions,
    setMockAnswers,
    log
} from './helpers/mockPromptAndConsoleLog.js';
import App from '../classes/App.js';
import Player from '../classes/Player.js'


test( "Check that createPlayers method asks the user for player names", () => {
    // Set mock answers
    setMockAnswers( 'Anna', 'Ola' );

    // Create an instance of the App class, which calls createPlayers
    const app = new App();

    // Call the createPlayers method directly
    app.createPlayers();

    // Check that the promptQuestions array contains both questions
    expect( promptQuestions ).toContain( 'Spelare X:s namn: ' );
    expect( promptQuestions ).toContain( 'Spelare O:s namn: ' );
    log( "Pass: createPlayers method asks the user for player names" );
} );


test( "Check that createPlayers method saves player names and colors correctly", () => {
    // Set mock answers for player names
    setMockAnswers( 'Anna', 'Ola' ); // The third answer is for the "Vill ni spela med samma namn?" prompt

    // Create an instance of the App class
    const app = new App();

    // Call the createPlayers method directly
    app.createPlayers();

    // Check that player names and colors are correctly assigned
    expect( app.playerX ).not.toBeNull();
    expect( app.playerX.name ).toBe( 'Anna' );
    expect( app.playerX.color ).toBe( 'X' );

    expect( app.playerO ).not.toBeNull();
    expect( app.playerO.name ).toBe( 'Ola' );
    expect( app.playerO.color ).toBe( 'O' );
    log( "Pass: createPlayers method saves player names and colors correctly" );
} );

test( "Check that createPlayers method skips player creation when using same names", () => {
    // Set mock answers
    setMockAnswers( 'ja' ); // Answer 'ja' to reuse the same names

    // Create an instance of the App class and set player names
    const app = new App();
    app.playerX = new Player( 'Anna', 'X' );
    app.playerO = new Player( 'Ola', 'O' );

    // Spy on the getPlayerName method
    const getPlayerNameSpy = vi.spyOn( app, 'getPlayerName' );

    // Call the createPlayers method directly
    app.createPlayers();

    // Ensure getPlayerName was not called again
    expect( getPlayerNameSpy ).not.toHaveBeenCalled();
    log( "Pass: createPlayers method skips player creation when using same names." );
} );


test( "Check that new names and colors saves correctly when players shoosed to play with new name", () => {
    // Set mock answers
    setMockAnswers( 'nej', 'Bo', 'Karl' ); // Answer 'nej' to reuse the same names

    // Create an instance of the App class and set player names
    const app = new App();
    app.playerX = new Player( 'Anna', 'X' );
    app.playerO = new Player( 'Ola', 'O' );

    // Spy on the getPlayerName method
    const getPlayerNameSpy = vi.spyOn( app, 'getPlayerName' );

    // Call the createPlayers method directly
    app.createPlayers();

    // Ensure getPlayerName was called again
    expect( getPlayerNameSpy ).toHaveBeenCalled();

    // Check that player names and colors are correctly assigned
    expect( app.playerX ).not.toBeNull();
    expect( app.playerX.name ).toBe( 'Bo' );
    expect( app.playerX.color ).toBe( 'X' );

    expect( app.playerO ).not.toBeNull();
    expect( app.playerO.name ).toBe( 'Karl' );
    expect( app.playerO.color ).toBe( 'O' );
    log( "Pass: Check that new names and colors saves correctly when players shoosed to play with new name" );
} );
