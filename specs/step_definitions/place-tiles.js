import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step to ensure the board is empty
Given('the board is empty', () => {
  // Visit the game page and reset the board to its initial state
   cy.visit( 'http://localhost:5173/'); // Adjust the path to your game page
  cy.get('#reset-game-button').click(); // Reset game to start fresh
  cy.get('.column').each(($column) => {
    cy.wrap($column).find('.tile').should('not.exist'); // Ensure all columns are empty
  });
});

// Step where the player places a tile in a column
When('the player places a tile in a column', () => {
  cy.get('.column').first().click(); // Click on the first column to place a tile
});

// Step to check that the tile is placed correctly
Then('the tile is placed correctly', () => {
  cy.get('.column').first().find('.tile').last().should('have.class', 'player-tile'); // Ensure the tile is added with the correct class
});

// Step to check if the board updates accordingly
Then('the board updates', () => {
  cy.get('.board').should('contain', 'player-tile'); // Ensure the board contains the player's tile
});

// Step to set up a full column
Given('one column is full', () => {
  const columnIndex = 0; // The index of the column that will be filled
  for (let i = 0; i < 6; i++) { // Assuming each column holds 6 tiles
    cy.get(`.column:eq(${columnIndex})`).click(); // Fill the first column completely
  }
  cy.get(`.column:eq(${columnIndex}) .tile`).should('have.length', 6); // Ensure the column is full
});

// Step where the player tries to place a tile in a full column
When('the player tries to place a tile in the full column', () => {
  const columnIndex = 0;
  cy.get(`.column:eq(${columnIndex})`).click(); // Attempt to place a tile in the full column
});

// Step to check that the tile is not placed in a full column
Then('the tile is not placed', () => {
  cy.get(`.column:eq(0) .tile`).should('have.length', 6); // Ensure the number of tiles remains the same
});

// Step to check that an error is shown when trying to place a tile in a full column
Then('an error is shown', () => {
  cy.get('.error-message').should('be.visible').and('contain', 'Column is full'); // Check for an error message
});

// Step to simulate hovering over a column
Given('the player hovers over a column', () => {
  cy.get('.column').first().trigger('mouseover'); // Simulate hovering over the first column
});

// Step to verify that a preview of the tile's position is shown
Then('a preview of the tile position is shown', () => {
  cy.get('.column').first().find('.preview-tile').should('exist'); // Ensure a preview tile is shown
});
