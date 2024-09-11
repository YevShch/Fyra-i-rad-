import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('the game is running', () => {
  cy.visit('http://localhost:5173/'); // Go to the game page
});

When('the player clicks the "Replay" button', () => {
  cy.get('#replay-button').click(); // Click the Replay button
});

Then('a dialog should show whose turn it is', () => {
  cy.get('.dialog').should('be.visible'); // Check the dialog is visible
  cy.get('.dialog').should('contain.text', "IT'S"); // Check the dialog contains "IT'S"
});

And('the player should click "OK" to start the game', () => {
  cy.get('.dialog').contains('OK').click(); // Click OK in the dialog
});

Then('previous game data should be cleared', () => {
  cy.get('.column').each(($column) => {
    cy.wrap($column).find('.tile').should('not.exist'); // Ensure columns are empty
  });
});

And('the game should restart', () => {
  cy.get('#current-player').should('be.visible'); // Ensure game has started again
});

Given('the game is running and the last game was started by the red player', () => {
  cy.visit('/'); // Go to the game page
  cy.get('#replay-button').click(); // Click the Replay button to set up
  cy.get('.column').first().click(); // Make a move to simulate game play
  cy.get('#current-player').should('contain.text', "Red Player's Turn"); // Ensure red player started
  cy.get('#replay-button').click(); // Click Replay to reset the game
});

Then('the yellow player should start this game', () => {
  cy.get('#current-player').should('contain.text', "Yellow Player's Turn"); // Ensure yellow starts the new game
});
