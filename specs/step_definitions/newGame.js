import { When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Duplicated steps
// Then('I am on the game page', () => {
// });

// Given('Enter the first players name {string}', (name) => {
// });

// And('Enter the second players name {string}', (name) => {
// });

// When('the game starts', () => {
// });

// Verify that Player 1 won the game
Then('Player1 wins the game', () => {
cy.contains('Player 1 wins').should('be.visible'); // Verify your winning message
});

// Verify that the "New game" button appears
And('I should see the "New game" button', () => {
  cy.contains('New game').should('be.visible'); // Verify that the "New game" button appears
    cy.wait( 3000 );
});

// Step for clicking the 'Continue' button
When( 'I click the "New game" button', () => {
  cy.contains( 'New game' ).click(); // Click the 'Continue' button
} );


When( 'the game restarts', () => {
  cy.get( '.button' ).contains( 'New game' ).click();
  cy.wait( 1000 );
} );

// Check the game starts with new player names
Then('the game should start with player {string} as {string}', (playerName, color) => {
  const colorClass = color === 'red' ? 'red-circle' : 'yellow-circle';
  cy.contains(`${playerName}'s turn`).should('be.visible'); // Check the message that it is the player's turn
  cy.get(`.${colorClass}`).should('exist'); // Check that the correct colored circle exists
  cy.get('.board').should('exist'); // Check out the new board
});

And('a new board is displayed', () => {
  cy.get('.board').should('exist'); // Verify new board item exists
  cy.get('.board').should('be.visible'); // Verify that the board is visible
});

// Check that the game starts with the correct player's turn
And('it should be {string}\'s turn with the red circle shown', (playerName) => {
  cy.contains(`${playerName}'s turn`).should('be.visible'); // Check the message that it is the player's turn
  cy.get('.red-circle').should('exist'); // Check that the red circle exists
});


