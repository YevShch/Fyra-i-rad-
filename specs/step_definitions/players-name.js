import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given( 'the game has started', () => {
  cy.visit( 'http://localhost:5173/' );
} );


When( 'the system starts', () => {
  cy.contains( 'CONNECT FOUR' ).should( 'be.visible' );
} );


When( 'I enter {string} as the name of Player 1', ( name ) => {
  cy.get( 'input[name="answer"]' )
    .type( name )
    .should( 'have.value', name )
    .type( '{enter}' );
} );


When( 'the system asks for the name of Player 1', () => {
  cy.contains( 'Enter the name of player' ).should( 'be.visible' );
} );


Then( 'the system should ask for the name of Player 1', () => {
  cy.contains( 'Enter the name of player' ).should( 'be.visible' );
} );


Then( 'the system asks for the name of Player 2', () => {
  cy.contains( 'Enter the name of player' ).should( 'be.visible' );
} );


Then( 'I enter {string} as the name of Player 2', ( name ) => {
  cy.get( 'input[name="answer"]' )
    .type( name )
    .should( 'have.value', name )
    .type( '{enter}' );
} );


Then( 'the system should display the message {string}', ( message ) => {
  cy.contains( message ).should( 'be.visible' );
} );


Then( 'the game should display {string} with a red circle indicating it is Player 1\'s turn', ( turnMessage ) => {
  cy.get( '.color-circle.red-circle' ).should( 'exist' );
  cy.contains( turnMessage ).should( 'be.visible' );
} );


Then( 'the system should re-ask for the name of Player 1', () => {
  cy.contains( 'Enter the name of player' ).should( 'be.visible' );
} );


Then( 'the system should accept the name and ask for the name of Player 2', () => {
  cy.contains( 'Enter the name of player' ).should( 'be.visible' );
} );
