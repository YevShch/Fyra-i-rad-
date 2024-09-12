import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Verify that the game is loaded and the board is empty
Given('the game is loaded and the board is empty', () => {
  cy.visit('http://localhost:5173/');
  // Wait for all cells to be loaded
  cy.get('.cell', { timeout: 10000 }).should('have.length.gte', 42); // Check that there are enough cells
  cy.get('.cell.empty', { timeout: 10000 }).should('have.length.gte', 42); // Check that all cells are empty
});

// Simulate entering player names
Then('the players have entered their names', () => {
  cy.window().then((win) => {
    if (win.dialog) {
      cy.stub(win.dialog, 'ask').resolves('RedPlayer').onCall(1).resolves('YellowPlayer');
    } else {
      throw new Error('Dialog is not available on the window object.');
    }
  });
  cy.wait(2000); // Wait for the necessary time
});

// The red player places a tile in the first column
When('the red player places a tile in the first column', () => {
  cy.get('.cell[data-column="0"]').first().click({ force: true });
});

// Verify that the tile is placed correctly and the board updates
Then('the tile is placed correctly and the board updates', () => {
  cy.wait(3000); // Wait for 3 seconds for the UI to update
  cy.get('.cell[data-column="0"]').first()
    .should('have.class', 'red').wait(1000)
    .and('not.have.class', 'empty');
});

// Verify that the first column is full
Given('the first column is full', () => {
  cy.get('.cell[data-column="0"]').each(($cell, index) => {
    if (index < 6) {
      cy.wrap($cell).click({ force: true });
    }
  });
  cy.get('.cell[data-column="0"]').should('have.length', 6);
});

// The red player tries to place another tile in the full column
When('the red player tries to place another tile in the full column', () => {
  cy.get('.cell[data-column="0"]').first().click({ force: true });
});

// Verify that the tile is not placed
Then('the tile is not placed', () => {
  cy.get('.cell[data-column="0"] .circle').should('have.length', 6);
});

// Hover over the first column
When('the player hovers over the first column', () => {
  cy.get('.cell[data-column="0"]').first().trigger('mouseover');
});

// Verify that a preview of the tile position is shown
Then('a preview of the tile position is shown', () => {
  cy.get('.cell[data-column="0"]').first().should('have.class', 'preview');
});
