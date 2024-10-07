import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

// Given One of the two players starts the game and the other joins the game
Given('Redplayer starts the game Yellowplayer joins the game', () => {
  cy.visit('/iframed-network-play.html');

  // Player Red starts the game
  getIframeBody('iframe#playerRed').find('.button.Yes').click();
  getIframeBody('iframe#playerRed').find('.button.Create').click();
  getIframeBody('iframe#playerRed').find('input[name="answer"]').type('Nile{enter}');
  
  // Retrieve the join code
  getIframeBody('iframe#playerRed').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val(); // Store the join code

    // Player Yellow joins the game
    getIframeBody('iframe#playerYellow').find('.button.Yes').click();
    getIframeBody('iframe#playerYellow').find('.button.Join').click();
    getIframeBody('iframe#playerYellow').find('input[name="answer"]').type('Tuna{enter}');
    getIframeBody('iframe#playerYellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
    cy.wait(1000);
  });
});
When('both players play the game until one wins', () => {
  for (let i = 0; i < 4; i++) {
    getIframeBody('iframe#playerRed').find('.cell.empty[data-column="1"]').first().should('be.visible').click({ force: true }); // Player Red's move
    cy.wait(1000);
    getIframeBody('iframe#playerYellow').find('.cell.empty[data-column="2"]').first().should('be.visible').click({ force: true }); // Player Yellow's move
    cy.wait(1000);
  }
});
// And the winner should be visible on both screens
Then('the winner should be visible on both screens', () => {
  getIframeBody('iframe#playerRed').find('.player-name')
  .should('be.visible')
  .and('have.text', 'Nile won!');
cy.wait(1000);

getIframeBody('iframe#playerYellow').find('.player-name')
.should('be.visible')
.and('have.text', 'Nile won!');
cy.wait(1000);
});

// When the "Replay" button can be clicked on the Red Player's screen
When('the "Replay" button can be clicked on the Red Player\'s screen', () => {
  getIframeBody('iframe#playerRed').find('.button').contains('Replay')
    .should('be.visible')
    .and('not.be.disabled')
    .click();
});



