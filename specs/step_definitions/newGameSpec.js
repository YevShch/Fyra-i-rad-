
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the game page', () => {
  // Visit the root URL of the app (or wherever the game is hosted)
  cy.visit('/http://127.0.0.1:5500/index.html');
});

Given('the game is in progress', () => {
  // Simulate starting the game or make sure the game has started.
  cy.contains('Waiting for player names...'); // Game is waiting for names
  cy.get('.prompt-text').contains('Enter the name of player red:').type('Player1');
  cy.get('input[type="text"]').type('Player2');
  cy.contains('Player1 turn...'); // Ensure the game starts and the red player has their turn
});

Given('the game is over', () => {
  // Simulate the game over condition, either through UI actions or by setting the game state directly
  cy.contains('Player1 turn...'); // Make sure the game started first
  cy.get('.column').first().click();  // Player1 makes a move
  cy.contains('Player2 turn...');
  // Assume the game has ended (player 2 won or it's a tie)
  cy.contains('It\'s a tie...');  // Or Player 1/2 won, adjust for the actual condition
});

When('I click on the "New game" button', () => {
  // Click the "New game" button
  cy.contains('New game').click();
});

When('I click on the "Quit this game" button', () => {
  // Click the "Quit this game" button
  cy.contains('Quit this game').click();
});

Then('the game should reset and ask for new player names', () => {
  // Check that the game state is reset and it asks for new player names
  cy.contains('Waiting for player names...');
});

Then('the "New game" button should be visible', () => {
  // After quitting, the "New game" button should appear
  cy.contains('New game').should('exist');
});

