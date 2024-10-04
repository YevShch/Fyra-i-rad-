import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";
import { should } from "chai";

Given('that there are two players, and the first player can start the game', () => {
  // Visit the helper page that has two iframes emulating two players
  cy.visit('/iframed-network-play.html');

  // Player Red starts the game and gets the join code
  getIframeBody('iframe#playerRed').find('.button.Yes').click();
  getIframeBody('iframe#playerRed').find('.button.Create').click();
  getIframeBody('iframe#playerRed').find('input[name="answer"]').type('Gursel{enter}');

  // Capture the join code and let Player Yellow join the game
  getIframeBody('iframe#playerRed').find('input[name="joinCode"]').then((element) => {
    const joinCode = element.val(); // Capture the join code

    // Player Yellow joins the game using the join code
    getIframeBody('iframe#playerYellow').find('.button.Yes').click();
    getIframeBody('iframe#playerYellow').find('.button.Join').click();
    getIframeBody('iframe#playerYellow').find('input[name="answer"]').type('Esra{enter}');
    getIframeBody('iframe#playerYellow').find('dialog:contains("join code") input[name="answer"]').type(joinCode + '{enter}');
    cy.wait(3000);
  });
});

When('both players take their turns in the game', () => {
  // Player Red takes a turn (place a piece in column 1)
  getIframeBody('iframe#playerRed').find('.cell.empty[data-column="1"]').first().click();
  cy.wait(3000);

  // Check that Player Yellow's turn is now displayed
  getIframeBody('iframe#playerYellow').find('.player-name');
  //should('be.visible')
    should('have.text', "esra's turn...");
 
  // Player Yellow takes a turn (place a piece in column 2)
  getIframeBody('iframe#playerYellow').find('.cell.empty[data-column="2"]').first().click();
  cy.wait(3000);

  // Check that Player Red's turn is now displayed
  getIframeBody('iframe#playerRed').find('.player-name');
    //should('be.visible')
      should('have.text', "gursel's turn...");
    cy.wait(3000);
});

Then('the game can display "Gursel\'s turn" on Player Red\'s screen when it\'s Player Red\'s turn', () => {
  // Verify that it's Player Red's turn (Gursel's turn)
  getIframeBody('iframe#playerRed').find('.player-name')
    //should('be.visible')
    should('have.text', "gursel's turn...");
});

Then('the game can display "Esra\'s turn" on Player Yellow\'s screen when it\'s Player Yellow\'s turn', () => {
  // Verify that it's Player Yellow's turn (Esra's turn)
  getIframeBody('iframe#playerYellow').find('.player-name')
    //should('be.visible')
    should('have.text', "esra's turn...");
});

Then('the game can show the winner', () => {
  // Simulate a series of turns until a winner is determined
  for (let i = 0; i < 3; i++) {
    // Alternate between Player Red and Player Yellow making moves
    getIframeBody('iframe#playerRed').find('.cell.empty[data-column="1"]').first().click();
    cy.wait(1000);
    getIframeBody('iframe#playerYellow').find('.cell.empty[data-column="2"]').first().click();
    cy.wait(1000);
  }

  // Check for winner on Player Red's screen
  getIframeBody('iframe#playerRed').find('.player-name')
    .should('be.visible')
    .and('have.text', 'Gursel won!');

  // Check for winner on Player Yellow's screen
  getIframeBody('iframe#playerYellow').find('.player-name')
    .should('be.visible')
    .and('have.text', 'Gursel won!');
});