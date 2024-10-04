import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Steps for entering Player 1's name
Given( 'Player 1 enters their name as {string}', ( name ) => {
  cy.get( 'input[name="answer"]' )
    .type( name )
    .should( 'have.value', name )
    .type( '{enter}' );
  cy.wait( 200 );
} );

// Steps for entering Player 2's name
Given( 'Player 2 enters their name as {string}', ( name ) => {
  cy.contains( 'Enter the name of player' ).should( 'be.visible' );
  cy.get( 'input[name="answer"]' )
    .type( name )
    .should( 'have.value', name )
    .type( '{enter}' );
  cy.wait( 200 );
} );

When( 'the game begins', () => {
  cy.get( '.board' ).should( 'be.visible' );
} );

Then( 'Player 1 and Player 2 play until Player 1 wins the first round', () => {
  playGameForWinner( 0, 1 );
} );

function playGameForWinner ( player1Column, player2Column ) {
  for ( let i = 0; i < 4; i++ ) {
    cy.get( `.cell.empty[data-column="${ player1Column }"]` ).first().should( 'be.visible' ).click();
    cy.wait( 2000 );
    cy.get( `.cell.empty[data-column="${ player2Column }"]` ).first().should( 'be.visible' ).click();
    cy.wait( 2000 );
  }
  cy.wait( 1000 );
}


// Steps for checking that Player 1 is declared the winner
Then( 'the system should declare Player 1 as the winner with name {string}', ( winnerName ) => {
  cy.contains( `${ winnerName } won!` ).should( 'be.visible' );
  cy.wait( 200 );
} );

When( 'Player 1 and Player 2 start a new round', () => {
  cy.get( '.button' ).contains( 'Replay' ).click();
  cy.wait( 200 );
  cy.get( '.button.OK' ).click();
  cy.wait( 500 );
} );

When( 'the round ends in a draw', () => {
  playDrawGame();
} );

// Function for a game that results in a draw
function playDrawGame () {

  const steps = [
    { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 },
    { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 },
    { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 },
    { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 },
    { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 },
    { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 },
    { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }
  ];

  // Go through the steps by clicking on the first available cell in each specified column
  steps.forEach( step => {
    cy.get( `.cell.empty[data-column="${ step.col }"]` ).first().click();

  } );
  cy.wait( 500 );
}


// Checking for a tie
Then( 'the system should display a message indicating the game is a draw', () => {
  cy.contains( "It's a tie..." ).should( 'be.visible' );
} );

// Checking that the game declares a winner or a tie
Then( 'the system should declare a winner or a draw with Player 1 name {string}', ( winnerName ) => {
  cy.contains( `${ winnerName } won!` ).should( 'be.visible' );
  cy.wait( 100 );
} );

Then( 'Player 1 and Player 2 play until the game ends', () => {
  playGameForWinner( 2, 3 );
} );

// When( 'the game restarts', () => {
//   cy.get( '.button' ).contains( 'New game' ).click();
//   cy.wait( 1000 );
// } );


// Checking that Player 1 can start a new game
Then( 'the system should allow Player 1 {string} to start a new game', ( playerName ) => {
  cy.contains( `${ playerName }'s turn` ).should( 'be.visible' );
  cy.wait( 100 );
} );

Then( 'Player 1 and Player 2 play two rounds', () => {
  //Play first round 
  playGameForWinner( 1, 3 );
  // Replay the game
  cy.get( '.button' ).contains( 'Replay' ).click();
  cy.wait( 1000 );
  cy.get( '.button.OK' ).click();
  cy.wait( 1000 );
  // Play second round 
  playGameForWinner( 0, 1 );
  cy.wait( 100 );
} );

// Checking that Player 2 is declared the winner
Then( 'the system should declare Player 2 as the winner with name {string}', ( winnerName ) => {
  cy.contains( `${ winnerName } won!` ).should( 'be.visible' );
} );

// Checking that a new game starts with Player 1
Then( 'the system should start a new game with Player 1 {string}', ( playerName ) => {
  cy.contains( `${ playerName }'s turn` ).should( 'be.visible' );
} );

// Checking that the system announces the winner
Then( 'the system should announce the winner as {string}', ( winnerName ) => {
  cy.contains( `${ winnerName } won!` ).should( 'be.visible' );
  cy.wait( 100 );
} );

// Checking that Player 2 can start a new game
Then( 'the system should allow Player 2 {string} to start a new game', ( playerName ) => {
  cy.contains( `${ playerName }'s turn` ).should( 'be.visible' );
} );

Then( 'Player 1 wins the game', () => {
  playGameForWinner( 1, 3 );
} );
