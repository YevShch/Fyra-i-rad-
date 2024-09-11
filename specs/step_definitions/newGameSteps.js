
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the game page', () => {
  cy.visit('/');
});

When('I click the "New game" button', () => {
  cy.contains('New game').click();
});

Then('I should be prompted to enter the name of player {string}', (color) => {
  const colorCircle = color === 'red' ? 'red-circle' : 'yellow-circle';
  cy.get('.prompt-text').should('contain', `Enter the name of player`).within(() => {
    cy.get(`.${colorCircle}`).should('exist');
  });
});

When('I enter {string} as the {string} player name', (playerName, color) => {
  cy.get('.dialog-input').type(playerName);
  cy.get('.dialog-ok-button').click();
});

Then('the game should start with player {string} as {string} and a new board is displayed', (playerName, color) => {
  cy.get('main').should('contain', playerName);
  const colorClass = color === 'red' ? 'red-circle' : 'yellow-circle';
  cy.get(`.${colorClass}`).should('exist');
  cy.get('.board').should('exist');
});

Then('it should be {string}\'s turn with the {string} circle shown', (playerName, color) => {
  const colorClass = color === 'red' ? 'red-circle' : 'yellow-circle';
  cy.get('main').should('contain', `${playerName}'s turn`);
  cy.get(`.${colorClass}`).should('exist');
});
