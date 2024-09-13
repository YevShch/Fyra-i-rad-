import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Given step for starting the game with player names
Given('the game starts with Player 1 named {string} and Player 2 named {string}', (player1Name, player2Name) => {
  cy.visit('http://localhost:5173'); // Justera URL:en till din lokala server
  // Enter Player 1's name
  cy.get('input[name="answer"]')
    .type(player1Name)
    .should('have.value', player1Name)
    .type('{enter}');
  cy.wait(200);
  // Enter Player 2's name
  cy.contains('Enter the name of player').should('be.visible');
  cy.get('input[name="answer"]')
    .type(player2Name)
    .should('have.value', player2Name)
    .type('{enter}');
  cy.wait(200);
});

// When step for the game beginning
When('the game begins', () => {
  cy.get('.board').should('be.visible'); // Kontrollera att spelbrädet visas
});

// Then step to check the correct player turn display
Then("the system should display that it is Player 1's turn with the red piece", () => {
  cy.contains("Jonas's turn (Red)").should('be.visible'); // Kontrollera att det är Jonas tur med röd pjäs
});

// When step for Player 1 making a move
When('Player 1 makes a move', () => {
  cy.get('.cell.empty[data-column="0"]').first().click(); // Simulera att Spelare 1 gör ett drag i den första kolumnen
  cy.wait(200);
});

// Then step to check Player 2's turn display
Then("the system should display that it is Player 2's turn with the yellow piece", () => {
  cy.contains("Anna's turn (Yellow)").should('be.visible'); // Kontrollera att det är Annas tur med gul pjäs
});

// When step for Player 2 making a move
When('Player 2 makes a move', () => {
  cy.get('.cell.empty[data-column="1"]').first().click(); // Simulera att Spelare 2 gör ett drag i den andra kolumnen
  cy.wait(200);
});

// Then step to check Player 1's turn display
Then("the system should display that it is Player 1's turn with the red piece", () => {
  cy.contains("Jonas's turn (Red)").should('be.visible'); // Kontrollera att det är Jonas tur igen med röd pjäs
});
