import { Given, Then, And, When } from "@badeball/cypress-cucumber-preprocessor";

Then('the system should declare {string} as the winner', (playerName) => {
  cy.contains(`${playerName} won!`).should('be.visible'); // Verify winner
});

When('the following moves are made:', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    const { player, column } = row;

    // Select the correct cell based on the column and simulate the move
    if (player === 'red') {
      cy.get('.cell').eq(column).click({ force: true }); // Click the first available cell in the specified column for red
    } else if (player === 'yellow') {
      cy.get('.cell').eq(column).click({ force: true }); // Click the first available cell in the specified column for yellow
    }

    // Optionally wait between moves for animations
    cy.wait(500);
  });
});
