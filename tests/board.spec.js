import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber';
import { expect } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import click from './helpers/mock-help/triggerOnclick.js';
import App from '../classes/App.js';

// Load the feature file
const feature = await loadFeature( 'tests/board.feature' );

describeFeature( feature, ( { BeforeAllScenarios, AfterAllScenarios, BeforeEachScenario, AfterEachScenario, Scenario } ) => {

  let body; // Declare the variable to use in all scenarios
  let app;  // To store the app instance

  // Initialization before all scenarios
  BeforeAllScenarios( () => {
    body = getDocument().body;
  } );

  // Initialization before each scenario (if reloading the app is required for each test)
  BeforeEachScenario( () => {
    app = new App();  // Initialize the app for each scenario
  } );

  
  Scenario( 'Display the correct logo or headline text', ( { Given, When, Then } ) => {
    Given( 'the game has started', () => {
      // We already initialized the game in BeforeEachScenario, no need to duplicate here
    } );

    When( 'the page is loaded', () => {
      // Page load logic is already handled during initialization
    } );

    Then( 'the headline should display "Connect four"', () => {
      // Check that the headline contains the text 'Connect four'
      let h1 = body.querySelector( 'h1' );
      expect( h1.innerText ).toContain( 'Connect Four' );
    } );
  } );

 
  Scenario( 'The board contains 42 cells', ( { Given, When, Then } ) => {
    Given( 'the game has started', () => {
      // The game is already started in BeforeEachScenario
    } );

    When( 'the game board is displayed', () => {
      let board = body.querySelector( '.board' );
      expect( board ).toBeDefined();
    } );

    Then( 'the board should contains 42 cells', () => {
      let board = body.querySelector( '.board' );
      let cells = board.querySelectorAll( '.cell' );
      expect( cells.length ).toBe( 42 );
    } );
  } );


  Scenario( 'Players make the first two moves, and the moves are displayed on the board', ( { Given, When, Then } ) => {
    Given( 'the game has started and the players are registered', async () => {
      let { body } = getDocument();
      globalThis.mockAnswers = [ 'Anna', 'Beata' ];
      let app = new App();

      // Wait for players to be registered
      await waitUntil( () => !body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ) );

      // Check that the players are registered
      expect( app.playerRed.name ).toBe( 'Anna' );
      expect( app.playerYellow.name ).toBe( 'Beata' );
    } );

    When( 'Player 1 drops a disc into the first column', async () => {
      // Simulate click on the first column
      click( body.querySelector( '.cell[data-column="0"]' ) );
 
    } );

    Then( 'the first column should display a disc from Player 1', async () => {
      // Chose all elements in the column 0
      const cells = document.querySelectorAll( '.cell[data-column="0"]' );
      // Last element in the column
      const lastCell = cells[ cells.length - 1 ]; 
      
      // Check that the last element in the column has the class 'red'
      expect( lastCell.classList.contains( 'red' ) ).toBeTruthy(); 
    } );

    When( 'Player 2 drops a disc into the second column', async () => {
      // Simulate click on the second column
      click( body.querySelector( '.cell[data-column="1"]' ) );
    } );

    Then( 'the second column should display a disc from Player 2', async () => {
      // Chose all elements in the column 1
      const cells = document.querySelectorAll( '.cell[data-column="1"]' ); 
      // Last element in the column
      const lastCell = cells[ cells.length - 1 ]; 
      
      // Check that the last element in the column has the class 'yellow'
      expect( lastCell.classList.contains( 'yellow' ) ).toBeTruthy(); 
    } );
  } );
} );

