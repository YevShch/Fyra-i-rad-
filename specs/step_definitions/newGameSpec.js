
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

Given('that there are two players, and one creates a game while the other joins it', () => {
  // Visit the helper page that has two iframes emulating two players
  cy.visit('/iframed-network-play.html');

  // Player Red starts the game and gets the join code
  getIframeBody('iframe#playerRed').find('.button.Yes').click();
  getIframeBody('iframe#playerRed').find('.button.Create').click();
  getIframeBody('iframe#playerRed').find('input[name="answer"]').type( 'Gursel{enter}' );
  
  getIframeBody('iframe#playerRed').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val(); // Capture the join code

    // Player Yellow joins the game using the join code
    getIframeBody('iframe#playerYellow').find('.button.Yes').click();
    getIframeBody('iframe#playerYellow').find('.button.Join').click();
    getIframeBody('iframe#playerYellow').find('input[name="answer"]').type( 'Esra{enter}' );
    getIframeBody('iframe#playerYellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
    cy.wait(1000);
  });
});

When('both players play the game until one of them wins', () => {
  // Simulate gameplay until one player wins
  for (let i = 0; i < 4; i++) {
    getIframeBody('iframe#playerRed').find('.cell.empty[data-column="1"]').first().should('be.visible').click();
    cy.wait(1000);
    getIframeBody('iframe#playerYellow').find('.cell.empty[data-column="2"]').first().should('be.visible').click();
    cy.wait(1000);
  }
});

Then('the game declares the winner', () => {
  // Check for winner on Player Red's screen
  getIframeBody('iframe#playerRed').find('.player-name')
    .should('be.visible')
    .and('have.text', 'Gursel won!');
  cy.wait(1000);

  // Check for winner on Player Yellow's screen
  getIframeBody('iframe#playerYellow').find('.player-name')
    .should('be.visible')
    .and('have.text', 'Gursel won!');
  cy.wait(1000);
});

Then('the victory confetti animation is correctly displayed on both Player Red\'s and Player Yellow\'s screens', () => {
  // Check confetti on Player Red's screen
  getIframeBody('iframe#playerRed').find('#confetti-container .confetti')
    .should('have.length.greaterThan', 0)
    .should('be.visible');

  // Check confetti on Player Yellow's screen
  getIframeBody('iframe#playerYellow').find('#confetti-container .confetti')
    .should('have.length.greaterThan', 0)
    .should('be.visible');
});

Then('the winning combination blinks on both Player Red\'s and Player Yellow\'s screens', () => {
  // Check winning cells on Player Red's screen
  getIframeBody('iframe#playerRed').find('.cell[data-column="1"]')
    .filter('.winning-cell')
    .should('have.length', 4);

  // Check winning cells on Player Yellow's screen
  getIframeBody('iframe#playerYellow').find('.cell[data-column="1"]')
    .filter('.winning-cell')
    .should('have.length', 4);
});

Then('the "NewPlay" button should be clickable on both Player Red\'s and Player Yellow\'s screens', () => {
  // Check if the "NewPlay" button is visible and clickable on Player Red's screen
  getIframeBody('iframe#playerRed').find('.button.NewPlay')
    .should('be.visible')
    .should('not.be.disabled');

  // Check if the "NewPlay" button is visible and clickable on Player Yellow's screen
  getIframeBody('iframe#playerYellow').find('.button.NewPlay')
    .should('be.visible')
    .should('not.be.disabled');
});

Then('when the "NewPlay" button is clicked on Player Red\'s screen, the game restarts for both players', () => {
  // Click the "NewPlay" button on Player Red's screen
  getIframeBody('iframe#playerRed').find('.button.NewPlay').click();
  cy.wait(1000);

  // Ensure the game is restarted for both players (e.g., no winner, empty board)
  getIframeBody('iframe#playerRed').find('.player-name')
    .should('not.exist'); // There should be no winner displayed after restart
  getIframeBody('iframe#playerRed').find('.cell.empty').should('have.length.greaterThan', 0);

  getIframeBody('iframe#playerYellow').find('.player-name')
    .should('not.exist'); // There should be no winner displayed after restart
  getIframeBody('iframe#playerYellow').find('.cell.empty').should('have.length.greaterThan', 0);
});
