import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Test for a draw
Given('Player 1 enters their name as {string}', (name) => {
  cy.visit('http://localhost:5173'); 
  cy.get('input[name="answer"]')
    .type(name)
    .should('have.value', name)
    .type('{enter}');
  cy.wait(200);
});

Given('Player 2 enters their name as {string}', (name) => {
  cy.contains('Enter the name of player').should('be.visible');
  cy.get('input[name="answer"]')
    .type(name)
    .should('have.value', name)
    .type('{enter}');
  cy.wait(200);
});

When('the game begins', () => {
  cy.get('.board').should('be.visible');
});

When('Player 1 and Player 2 play until the round ends in a draw', () => {
  playDrawGame(); // Använd funktionen för att simulera ett oavgjort spel
});

Then('the system should display a message indicating the game is a draw', () => {
  cy.contains("It's a tie...").should('be.visible');
  cy.wait(100);
});

// Funktion för att simulera ett oavgjort spel
function playDrawGame() {
  const steps = [
    { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 },
    { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 },
    { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 },
    { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 },
    { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 },
    { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 },
    { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }
  ];

  steps.forEach(step => {
    cy.get(`.cell.empty[data-column="${step.col}"]`).first().click();
  });
  cy.wait(500);
}

// Scenario: Boundary Test - Win on the last available cell
When('Player 1 and Player 2 play until the last move results in a win', () => {
  playGameUntilLastMoveWin(); // Använd funktionen för att simulera gränstestet
});

Then('the system should declare Player 1 as the winner with name {string}', (winnerName) => {
  cy.contains(`${winnerName} won!`).should('be.visible');
  cy.wait(100);
});

// Funktion för att simulera spelet tills sista draget leder till vinst
function playGameUntilLastMoveWin() {
  const steps = [
    { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 },
    { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 },
    { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 },
    { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 }, { col: 1 }, { col: 0 },
    { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 }, { col: 3 }, { col: 2 },
    { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 }, { col: 5 }, { col: 4 },
    { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 }, { col: 6 } // Sista draget som leder till vinst
  ];

  steps.forEach(step => {
    cy.get(`.cell.empty[data-column="${step.col}"]`).first().click();
  });
  cy.wait(500);
}