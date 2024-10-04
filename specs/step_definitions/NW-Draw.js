import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

Given('that there are two players in a connect four game, and one creates a game while the other joins it', () => {
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
    cy.wait(1000);
  });
});

When('both players play the game until it ends in a tie', () => {
  function playDrawGame() {
    const steps = [
      { col: 0, player: 'Red' }, { col: 1, player: 'Yellow' }, { col: 0, player: 'Red' }, { col: 1, player: 'Yellow' }, { col: 0, player: 'Red' }, { col: 1, player: 'Yellow' },
      { col: 2, player: 'Red' }, { col: 3, player: 'Yellow' }, { col: 2, player: 'Red' }, { col: 3, player: 'Yellow' }, { col: 2, player: 'Red' }, { col: 3, player: 'Yellow' },
      { col: 4, player: 'Red' }, { col: 5, player: 'Yellow' }, { col: 4, player: 'Red' }, { col: 5, player: 'Yellow' }, { col: 4, player: 'Red' }, { col: 5, player: 'Yellow' },
      { col: 1, player: 'Red' }, { col: 0, player: 'Yellow' }, { col: 1, player: 'Red' }, { col: 0, player: 'Yellow' }, { col: 1, player: 'Red' }, { col: 0, player: 'Yellow' },
      { col: 3, player: 'Red' }, { col: 2, player: 'Yellow' }, { col: 3, player: 'Red' }, { col: 2, player: 'Yellow' }, { col: 3, player: 'Red' }, { col: 2, player: 'Yellow' },
      { col: 5, player: 'Red' }, { col: 4, player: 'Yellow' }, { col: 5, player: 'Red' }, { col: 4, player: 'Yellow' }, { col: 5, player: 'Red' }, { col: 4, player: 'Yellow' },
      { col: 6, player: 'Red' }, { col: 6, player: 'Yellow' }, { col: 6, player: 'Red' }, { col: 6, player: 'Yellow' }, { col: 6, player: 'Red' }, { col: 6, player: 'Yellow' }
    ];

    steps.forEach(step => {
      const playerIframe = step.player === 'Red' ? 'iframe#playerRed' : 'iframe#playerYellow';

      // Each player makes their move by clicking an empty cell in the specified column
      getIframeBody(playerIframe)
        .find(`.cell.empty[data-column="${step.col}"]`).first()
        .should('exist')
        .click({ force: true });

      // Log the move (optional for debugging)
      cy.log(`Player ${step.player} -> Column ${step.col}`);

      // Wait a little bit after each move to ensure proper turn-taking visualization
      cy.wait(1000);
    });

    cy.wait(2000);  // Final wait to make sure the game has processed all moves
  }

  // Call the function to simulate the draw game
  playDrawGame();
});

Then('the game declares a draw on both players screens', () => {
  // Check the draw message on the red player's screen
  getIframeBody('iframe#playerRed').find('p:contains("It\'s a tie...") ')
    .should('be.visible')
    .and('have.text', 'It\'s a tie...');

  // Check the draw message on the yellow player's screen
  getIframeBody('iframe#playerYellow').find('p:contains("It\'s a tie...") ')
    .should('be.visible')
    .and('have.text', "It\'s a tie...");
});

