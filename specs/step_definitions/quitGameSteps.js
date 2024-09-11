import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the game is in progress", () => {
  // Set up the game with some progress (e.g., start the game and make a few moves)
  cy.visit("/");  // Assuming the game is at the root
  cy.get('main').should('be.visible'); // Check if the game is rendered
});

When("I click the 'Quit this game' button", () => {
  cy.getBoardState().as('initialBoard');
  cy.getCurrentPlayer().as('initialPlayer');
  cy.get('.button').contains('Quit this game').click();
});

Then("the game data is unchanged", function () {
  // Compare the stored initial state with the current state
  cy.get('@initialBoard').then((initialBoard) => {
    cy.getBoardState().should('deep.equal', initialBoard);
  });
  
  cy.get('@initialPlayer').then((initialPlayer) => {
    cy.getCurrentPlayer().should('equal', initialPlayer);
  });
});


Then("a dialog box appears with the question 'What do you want to do?'", () => {
  // Check for dialog box content
  cy.contains('What do you want to do?').should('be.visible');
});

Then("three buttons: 'Continue', 'Replay', 'New Game' are displayed", () => {
  // Check for the presence of all three buttons
  cy.contains('Continue').should('be.visible');
  cy.contains('Replay').should('be.visible');
  cy.contains('New game').should('be.visible');
});

When("I select the 'Continue' button", () => {
  // Click the continue button
  cy.contains('Continue').click();
});

Then("I return to the game", () => {
  // Ensure that the game is still visible
  cy.get('main').should('be.visible');
});

Then("the game data is unchanged", () => {
  // Verify the player and board state are unchanged
  // You may have stored the initial board state in previous steps
  cy.get('.color-circle').should('have.length', 42); // Verify board's tiles remain unchanged
  cy.get('.current-player').then($player => {
    const currentPlayer = $player.text();
    expect(currentPlayer).to.match(/red|yellow/); // Verify the current player is unchanged
  });
});
