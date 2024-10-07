import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

Given('that there are two players in a game, and one creates a game while the other joins it', () => {
  // Visit the helper setup with two iframes, each simulating one player
  cy.visit('/iframed-network-play.html');

  // Player Red (first player) starts a network game and gets the join code
  getIframeBody('iframe#playerRed').find('.button.Yes').click();
  getIframeBody('iframe#playerRed').find('.button.Create').click();
  getIframeBody('iframe#playerRed').find('input[name="answer"]').type('Anna{enter}');
  getIframeBody('iframe#playerRed').find('input[name="joinCode"]').then(element => {
    // Get the join code
    const joinCode = element.val();

    // Player Yellow (second player) joins the game
    getIframeBody('iframe#playerYellow').find('.button.Yes').click();
    getIframeBody('iframe#playerYellow').find('.button.Join').click();
    getIframeBody('iframe#playerYellow').find('input[name="answer"]').type('Beata{enter}');
    getIframeBody('iframe#playerYellow').find('dialog:contains("join code") input[name="answer"]')
      .type(joinCode + '{enter}');
    cy.wait(1000); // Wait for players to join
  });
});

When('both players play the game until Red wins vertically', () => {
  function simulateRedWin() {
    // Sequence of moves leading to Red's vertical win in column 0
    const steps = [
      { col: 0, player: 'Red' },
      { col: 1, player: 'Yellow' },
      { col: 0, player: 'Red' },
      { col: 1, player: 'Yellow' },
      { col: 0, player: 'Red' },
      { col: 1, player: 'Yellow' },
      { col: 0, player: 'Red' } // Red wins vertically in column 0
    ];

    steps.forEach(step => {
      const playerIframe = step.player === 'Red' ? 'iframe#playerRed' : 'iframe#playerYellow';

      // Wait for the iframe to load and ensure the cell is clickable
      cy.get(playerIframe, { timeout: 10000 }).should('exist');
      getIframeBody(playerIframe)
        .find(`.cell.empty[data-column="${step.col}"]`).first()
        .should('exist')
        .click({ force: true }); // Simulate the player's move

      cy.wait(500); // Wait for the game state to update
    });

    cy.wait(1000); // Additional wait for the final move to be processed
  }

  simulateRedWin(); // Execute the move sequence
});
Then('the game declares Red player {string} as the winner on both screens', (winner) => {
  // Function to check the victory message for a player
  const checkVictoryMessage = (player) => {
    const playerIframe = `iframe#player${player}`;

    // Ensure the iframe exists
    cy.get(playerIframe, { timeout: 10000 }).should('exist');

    // Log the current DOM for debugging
    cy.get(playerIframe).then(($iframe) => {
      const body = $iframe.contents().find('body');
      cy.log(body.html()); // Log the entire body HTML for inspection
    });

    // Look for the victory message
    getIframeBody(playerIframe)
      .find(`span.player-name:contains("${winner} won!")`) // Adjust to find the specific span
      .should('be.visible')
      .and('have.text', 'Anna won!'); // Validate the victory message
  };

  // Check victory message display on both players screens
  checkVictoryMessage('Red');   // Check victory message on Player Red screen
  checkVictoryMessage('Yellow'); // Check victory message on Player Yellow screen
});
