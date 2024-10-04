
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

Given ('that there are two players, and the first player should start the game', () => {
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



Then('the game should show the winner', () => {
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


Then('the "New Game" button should be clickable on the Player Red\'s screen', () => {
  // Check if the "NewGame" button is visible and clickable on Player Red's screen
  getIframeBody('iframe#playerRed').find('.button').contains('New game')
    .should('be.visible')
    .should('not.be.disabled');
    cy.wait(1000);

});

Then('when the "New Game" button is clicked on Player Red\'s screen', () => {
  // Click the "NewGame" button on Player Red's screen
  getIframeBody('iframe#playerRed').find('.button').contains('New game').click();
  cy.wait(1000);

});


Then('Ensure the red player can create a new game', () => {
  getIframeBody('iframe#playerRed').find('.dialog-question').contains('Network Play: Do you want to play')
    .should('be.visible');

  });
  
