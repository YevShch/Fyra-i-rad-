import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given('the game is loaded', () => {
  cy.visit('http://localhost:5173'); // Open the game page
});

When('the player enters {string} as the red player', (redPlayerName) => {
  cy.get('.prompt-text').should('contain', 'Enter the name of player'); // Wait for the name entry screen
  cy.get('input').type(`${redPlayerName}{enter}`); // Enter the red player's name and press Enter
});

And('the player enters {string} as the yellow player', (yellowPlayerName) => {
  cy.get('.prompt-text').should('contain', 'Enter the name of player'); // Wait for the name entry screen
  cy.get('input').type(`${yellowPlayerName}{enter}`); // Enter the yellow player's name and press Enter
});

Given('the game is in progress', () => {
  cy.visit('http://localhost:5173/');
  cy.get('input').type('Eva{enter}'); // Enter red player name
  cy.get('input').type('Alex{enter}'); // Enter yellow player name
  
  // Make the first moves
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });   // Yellow player places their piece

  // Simulate game end
  cy.get('.cell').first().click({ force: true }); 
  cy.get('.cell').last().click({ force: true });

  // Check if the dialog appears and close it
  cy.wait(2000); // Wait for the dialog to appear
  cy.get('dialog').should('be.visible'); // Verify the dialog is visible
  cy.get('.button.OK').click(); // Click the OK button
});

When('the player clicks the "Replay" button after the game ends', () => {
  cy.contains('Replay').click(); // Click the Replay button
});

Then('a dialog should show whose turn it is to start the new game', () => {
  cy.wait(1000); // Wait for the dialog to appear
  cy.get('dialog').should('be.visible'); // Verify the dialog is visible
  cy.get('dialog').should('contain.text', "IT'S"); // Verify the dialog contains the turn information
});

And('the player should click "OK" to start the new game', () => {
  cy.wait(1000); // Wait for the OK button to be visible
  cy.get('dialog').should('be.visible')
    .within(() => {
      cy.get('.button.OK').should('be.visible'); // Verify the OK button is visible
    });
});

And('the game board should be reset', () => {
  cy.get('.cell').each(($cell) => {
    cy.wrap($cell).find('.tile').should('not.exist'); // Verify that all columns are empty
  });
});

Given('the game was started by the red player', () => {
  cy.visit('http://localhost:5173');
  cy.get('.prompt-text').should('contain', 'Enter the name of player');
  cy.get('input').type('Eva{enter}');
  cy.get('input').type('Alex{enter}');

  // Wait for the page and elements to load
  cy.wait(5000); // Wait for 5 seconds

  // Check if the dialog and button are visible
  cy.get('dialog').should('be.visible')
    .within(() => {
      cy.get('.button.OK').should('be.visible'); // Verify the OK button is visible
    });

  // Instead of checking the text, check the appearance
  cy.get('div.color-circle.red-circle').should('exist'); // Verify the red circle is visible
});

When('the player clicks the "Replay" button', () => {
  cy.contains('Replay').click(); // Click the Replay button
});

Then('the yellow player should start the next game', () => {
  cy.get('p').should('contain.text', "Alex's turn"); // Verify the yellow player is starting the game
});

