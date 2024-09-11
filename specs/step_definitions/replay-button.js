import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('the game is running', () => {
  // TODO: implement step
  cy.visit('http://localhost:5173/'); 
   cy.get('main').should('contain.text', 'CONNECT FOUR');
});

When('the player clicks the {string} button', (a) => {
  // TODO: implement step
  cy.get('.button').contains('Replay').click();
});

Then('a dialog should show whose turn it is', () => {
  // TODO: implement step
});

Then('the player should click {string} to start the game', (a) => {
  // TODO: implement step
});

/* No duplicate steps, this one already above
Given('the game is running', () => {});*/

/* No duplicate steps, this one already above
When('the player clicks the {string} button', (a) => {});*/

Then('previous game data should be cleared', () => {
  // TODO: implement step
});

Then('the game should restart', () => {
  // TODO: implement step
});

Given('the game is running and the last game was started by the red player', () => {
  // TODO: implement step
});

/* No duplicate steps, this one already above
When('the player clicks the {string} button', (a) => {});*/

Then('the yellow player should start this game', () => {
  // TODO: implement step
});