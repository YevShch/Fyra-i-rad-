
import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Display quit dialog and resume the game with no changes

// Given the game is in progress (renamed to avoid conflicts)
Given('the game is in progress for quitting', () => {  // <-- Modified step name
  cy.visit('http://localhost:5173'); // Navigate to the game page
  cy.get('main').should('be.visible'); // Ensure the game page is visible
  
  // Start the game by entering player names
  // Use the correct selectors for the input fields after inspecting the page
  cy.get('input[name="player1_name"]').type('Alice').type('{enter}');
  cy.get('input[name="player2_name"]').type('Peter').type('{enter}');

// Wait for the first input field to be visible, then type in the red player name

  //Ensure that the game board is displayed
  cy.get('.board').should('exist');
  cy.wait( 2000 );
  });


// When I click the 'Quit this game' button
When('I click the {string} button', (buttonText) => {
  cy.contains(buttonText).click(); // Click the 'Quit this game' button
    cy.wait( 2000 );
});

// Then a dialog box appears with the question 'What do you want to do?'
Then('a dialog box appears with the question {string}', (questionText) => {
  cy.get('dialog').should('be.visible'); // Ensure the dialog box is visible
  cy.contains(questionText).should('be.visible'); // Check for the question text
});

// And three buttons: 'Continue', 'Replay', 'New Game' are displayed
And('three buttons: {string}, {string}, {string} are displayed', (continueButton, replayButton, newGameButton) => {
  // Check that the three buttons are visible
  cy.contains(continueButton).should('be.visible');
  cy.contains(replayButton).should('be.visible');
  cy.contains(newGameButton).should('be.visible');
});

// When I select the 'Continue' button
When('I select the {string} button', (buttonText) => {
  cy.contains(buttonText).click(); // Click the 'Continue' button
});

// Then I return to the game
Then('I return to the game', () => {
  cy.get('.board').should('exist'); // Ensure the game board is still displayed
});

// And the game data is unchanged
And('the game data is unchanged', () => {
  // Assert that the current game state is unchanged (board state remains the same)
  cy.get('.board .cell').each(($cell) => {
    cy.wrap($cell).should('have.class', 'empty'); // Checking that the cells are still in their previous state
  });
});


