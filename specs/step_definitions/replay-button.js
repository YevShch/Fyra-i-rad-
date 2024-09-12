import { Given, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Background: Start the game by entering player names
Given('the game is loaded', () => {
  cy.visit('http://localhost:5173'); // Loads the game
});

And('the player enters {string} as the red player', (redPlayerName) => {
  cy.get('.prompt-text').should('contain', 'Enter the name of player'); // Wait for the name entry screen
  cy.get('input').type(`${redPlayerName}{enter}`); // Enter the red player's name
});

And('the player enters {string} as the yellow player', (yellowPlayerName) => {
  cy.get('.prompt-text').should('contain', 'Enter the name of player'); // Wait for the name entry screen
  cy.get('input').type(`${yellowPlayerName}{enter}`); // Enter the yellow player's name
});

And('the game is in progress', () => {
  cy.get('.board').should('be.visible'); // Check if the game board is visible
});

And('the red player wins the game', () => {
  // Make moves for the red player to win the game
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });
  cy.get('.cell').first().click({ force: true }); // Red player places their piece

  cy.wait(1000); // Wait for animations to complete
});

// Single Scenario: Verify the winner's name is displayed and "Replay" button is clicked
Then('the system should declare "Eva" as the winner', () => {
  // Verify the winner's name is displayed
  cy.contains('Eva won!').should('be.visible'); // The winner's name should be visible
  
  // Check for the Replay button and click it
  cy.get('.button').contains('Replay').should('be.visible').click();
  
  // Wait for the dialog with OK button to appear
  cy.get('dialog').should('be.visible').within(() => {
    cy.get('.button.OK').should('be.visible').click(); // Click the OK button
  });

  // Verify the game board is reset
  cy.get('.cell').each(($cell) => {
    cy.wrap($cell).find('.tile').should('not.exist'); // Ensure all cells are empty
  });
});

Then('a dialog should show "Alex\'s turn" to start the new game', () => {
  // Verify the dialog shows "Alex's turn" for the new game
  cy.get('dialog').should('be.visible');
  cy.get('dialog').should('contain.text', "Alex's turn");
});

And('the player should click "OK" to start the new game', () => {
  // Click the OK button to start the new game
  cy.get('.button.OK').click();
});

And('the game board should be reset', () => {
  // Verify the game board has been reset
  cy.get('.cell').each(($cell) => {
    cy.wrap($cell).find('.tile').should('not.exist'); // Ensure all cells are empty
  });
});
