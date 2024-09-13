import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// // Given step for starting the game with player names
// Given('the game starts with Player 1 named {string} and Player 2 named {string}', (player1Name, player2Name) => {
//   cy.visit('http://localhost:5173'); // Justera URL:en till din lokala server
//   // Enter Player 1's name
//   cy.get('input[name="answer"]')
//     .type(player1Name)
//     .should('have.value', player1Name)
//     .type('{enter}');
//   cy.wait(200);
//   // Enter Player 2's name
//   cy.contains('Enter the name of player').should('be.visible');
//   cy.get('input[name="answer"]')
//     .type(player2Name)
//     .should('have.value', player2Name)
//     .type('{enter}');
//   cy.wait(200);
// });

// // When step for checking that the game begins
// When('the game begins', () => {
//   cy.get('.board').should('be.visible');
// });

// When step for simulating a draw game
When('the players play until the game ends in a draw', () => {
  playDrawGame();
});

// // Then step to check for the draw message
// Then('the system should display a message indicating the game is a draw', () => {
//   cy.contains("It's a tie...").should('be.visible');
//   cy.wait(100);
// });

// Function to simulate a draw game
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

// When step for simulating a boundary test win
When('the players play until the last move results in a win', () => {
  playGameUntilLastMoveWin();
});

// Then step to check for the win message
Then('the system should declare Player1 as the winner with name {string}', (winnerName) => {
  cy.contains(`${winnerName} won!`).should('be.visible');
  cy.wait(100);
});

// Function to simulate a boundary test win
function playGameUntilLastMoveWin() {
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
