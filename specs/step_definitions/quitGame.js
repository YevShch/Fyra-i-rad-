import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Go to the game page
Then('I am on the game page', () => {
cy.visit('http://localhost:5173/');  // Go to game page
cy.get('main').should('be.visible'); // Make sure the home screen is visible
});

// Write the name of player 1
Given('Enter the first players name {string}', (name) => {
  cy.get('input[name="answer"]')
    .type(name)
    .should('have.value', name)
    .type('{enter}');
  cy.wait(1000); 
});

// // Write the player 2
// And('Enter the second players name {string}', (name) => {
//   cy.contains('Enter the name of player').should('be.visible');
//   cy.get('input[name="answer"]')
//     .type(name)
//     .should('have.value', name)
//     .type('{enter}');
//   cy.wait(1000);
// });

// // Check if the game starts correctly when it starts
// When('the game starts', () => {
//   cy.get('.board').should('exist'); // Check if a new board is displayed
// });

// Quit game functionality

// // Step for clicking the 'Quit this game' button
// When('I click to "Quit this game" button', () => {
//   cy.get('.button').contains('Quit this game').click(); // Click the 'Quit' button
//   //cy.contains('Quit this game').click();
// });

// Verify that the dialog box appears
Then('a dialog box appears with the question "What do you want to do?"', () => {
  cy.contains('What do you want to do?').should('be.visible'); // Verify that the dialog box appears with the correct text
});

// Verify that the three buttons are displayed
And('three buttons: "Continue", "Replay", "New Game" are displayed', () => {
  cy.contains('Continue').should('be.visible'); // Verify 'Continue' button is visible
  cy.contains('Replay').should('be.visible'); // Verify 'Replay' button is visible
  cy.contains('New Game').should('be.visible'); // Verify 'New Game' button is visible
});

// Step for clicking the 'Continue' button
When('I click to "Continue" button', () => {
  cy.contains('Continue').click(); // Click the 'Continue' button
});

// Verify that the game returns to the game page
Then('I return to the game page', () => {
  cy.get('.board').should('exist'); // Check that the game page (board) is still displayed
  cy.get('.board').should('be.visible'); // Verify the board is still visible
});

// Verify that the game page is unchanged
And('the game page is unchanged', () => {
  cy.get('.board').should('exist'); // Ensure the board is still there
  cy.get('.red-circle, .yellow-circle').should('exist'); // Verify that player circles still exist
  cy.contains("'s turn").should('be.visible'); // Ensure it is still someone's turn
});




