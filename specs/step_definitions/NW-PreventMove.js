import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";


// Player 2 gör ett drag
When('Player 1 tries to make another move in column {int}', (column) => {
  getIframeBody('iframe#playerRed').find(`.cell.empty[data-column="${column}"]`).first().click();
  cy.wait(1000);
});

// Draget ska visas på Player 1:s skärm
Then('Player 1 should not be able to make the move in column {int}', (column) => {
  getIframeBody('iframe#playerYellow').find(`.cell[data-column="${column}"]`).should('not.have.class', 'red');
  getIframeBody('iframe#playerRed').find(`.cell[data-column="${column}"]`).should('not.have.class', 'red');
});


// Player 2 gör ett drag
When('Player 2 tries to make another move in column {int}', (column) => {
  getIframeBody('iframe#playerYellow').find(`.cell.empty[data-column="${column}"]`).first().click();
  cy.wait(1000);
});

// Draget ska visas på Player 1:s skärm
Then('Player 2 should not be able to make the move in column {int}', (column) => {
  getIframeBody('iframe#playerYellow').find(`.cell[data-column="${column}"]`).should('not.have.class', 'yellow');
  getIframeBody('iframe#playerRed').find(`.cell[data-column="${column}"]`).should('not.have.class', 'yellow');
});
