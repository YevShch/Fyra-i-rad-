/*
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

let board;

// Utility function to check turn messages
const checkTurnMessage = (color, playerName) => {
  cy.get('p .player-info .player-name').should('contain', `${playerName}'s turn`);
  if (color === 'red') {
    cy.get('.circle-container .color-circle').should('have.class', 'red-circle');
  } else {
    cy.get('.circle-container .color-circle').should('have.class', 'yellow-circle');
  }
};

Given('the game has started', () => {
  // Visit the game page and initialize
  cy.visit('http://127.0.0.1:5500/iframed-network-play.html'); // adjust the URL based on your app's setup
  cy.window().then((win) => {
    board = win.App.board; // Access the game board object
  });
});

When('Player Red makes a move', () => {
  // Player Red makes a move in an available column
  cy.window().then((win) => {
    // Simulate a move in a random available column
    const column = board.findAvailableColumn(); // A helper method to get an available column
    board.makeMove('red', column, true); // true for red player
  });
});

Then('it should be Player Yellow\'s turn', () => {
  cy.window().then((win) => {
    // Check that the current player is yellow
    expect(win.App.board.currentPlayerColor).to.equal('yellow');
  });
});

And('the message should display "Yellow\'s turn"', () => {
  // Check the displayed message
  checkTurnMessage('yellow', 'Yellow');
});

When('Player Yellow makes a move', () => {
  // Player Yellow makes a move in an available column
  cy.window().then((win) => {
    const column = board.findAvailableColumn(); // Find another available column for yellow
    board.makeMove('yellow', column, true); // true for yellow player
  });
});

Then('it should be Player Red\'s turn', () => {
  cy.window().then((win) => {
    // Check that the current player is red
    expect(win.App.board.currentPlayerColor).to.equal('red');
  });
});

And('the message should display "Red\'s turn"', () => {
  // Check the displayed message
  checkTurnMessage('red', 'Red');
});
*/
