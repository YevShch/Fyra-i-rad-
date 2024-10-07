import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

// Player 1 och Player 2 ansluter till spelet
Given('Player 1 and Player 2 have joined the game', () => {
  cy.visit('/iframed-network-play.html');

  // Player 1 skapar spelet
  getIframeBody('iframe#playerRed').find('.button.Yes').click();
  getIframeBody('iframe#playerRed').find('.button.Create').click();
  getIframeBody('iframe#playerRed').find('input[name="answer"]').type('Player1{enter}');
  getIframeBody('iframe#playerRed').find('input[name="joinCode"]').then(element => {
    let joinCode = element.val();

    // Player 2 går med i spelet
    getIframeBody('iframe#playerYellow').find('.button.Yes').click();
    getIframeBody('iframe#playerYellow').find('.button.Join').click();
    getIframeBody('iframe#playerYellow').find('input[name="answer"]').type('Player2{enter}');
    getIframeBody('iframe#playerYellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
    cy.wait(1000);
  });
});

// Player 1 gör ett drag
When('Player 1 makes a move in column {int}', (column) => {
  getIframeBody('iframe#playerRed').find(`.cell.empty[data-column="${column}"]`).first().click();
  cy.wait(1000);
});

// Draget ska visas på Player 2:s skärm
Then('The move should appear on both player screens in column {int}', (column) => {
  getIframeBody('iframe#playerYellow').find(`.cell[data-column="${column}"]`).last().should('have.class', 'red');
  getIframeBody('iframe#playerRed').find(`.cell[data-column="${column}"]`).last().should('have.class', 'red');
  cy.wait(1000)
});

// Player 2 gör ett drag
When('Player 2 makes a move in column {int}', (column) => {
  getIframeBody('iframe#playerYellow').find(`.cell.empty[data-column="${column}"]`).first().click();
  cy.wait(1000);
});

// Draget ska visas på Player 1:s skärm
Then('The move should display on both player screens in column {int}', (column) => {
  getIframeBody('iframe#playerYellow').find(`.cell[data-column="${column}"]`).should('have.class', 'yellow');
  getIframeBody('iframe#playerRed').find(`.cell[data-column="${column}"]`).should('have.class', 'yellow');
});
