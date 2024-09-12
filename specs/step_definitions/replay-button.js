import { Given, Then, And, When } from "@badeball/cypress-cucumber-preprocessor";

// Background: Start the game by entering player names
Given('the game is loaded', () => {
  cy.visit('http://localhost:5173'); // Loads the game
});

And('the player enters {string} as the red player', (redPlayerName) => {
  cy.get('.prompt-text').should('contain', 'Enter the name of player'); // Wait for the name entry screen
  // Enter the red player's name
  cy.get( 'input[name="answer"]' ).type( redPlayerName ).should( 'have.value', redPlayerName )
    .type( '{enter}' );
  cy.wait( 200 );
});

And('the player enters {string} as the yellow player', (yellowPlayerName) => {
  cy.get('.prompt-text').should('contain', 'Enter the name of player'); // Wait for the name entry screen
  // Enter the yellow player's name
  cy.wait( 500 );
  cy.get( 'input[name="answer"]' ).type( yellowPlayerName ).should( 'have.value', yellowPlayerName )
    .type( '{enter}' ); 
  cy.wait( 200 );
});

// And('the game is in progress', () => {
//   cy.get('.board').should('be.visible'); // Check if the game board is visible
// });

And('the red player wins the game', () => {
  // Make moves for the red player to win the game
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });
  cy.get('.cell').first().click({ force: true }); // Red player places their piece
  cy.get('.cell').eq(1).click({ force: true });
  cy.get('.cell').first().click({ force: true }); // Red player places their piece

  cy.wait(1000); // Wait for animations to complete
});


Then('the system should declare "Eva" as the winner', () => {
  // Verify the winner's name is displayed
  cy.contains('Eva won!').should('be.visible'); // The winner's name should be visible
} );

And( 'the "Replay" button should be visible', () => {
  // Check for the Replay button and click it
  cy.get( '.button' ).contains( 'Replay' ).should( 'be.visible' )
} );

When( 'the player clicks the "Replay" button', () => {
  // Check for the Replay button and click it
  cy.get( '.button' ).contains( 'Replay' ).should( 'be.visible' ).click();
} );

Then( 'a dialog should show {string}', ( message ) => {
  // Verify the dialog is visible and contains the correct message
  cy.get( 'dialog' ).should( 'be.visible' );
  cy.get( 'dialog' ).should( 'contain.text', message );
} );


And('the player should click "OK" to start the new game', () => {
  // Click the OK button to start the new game
  cy.get('.button.OK').click();
});

And('the game board should be reset', () => {
  // Verify the game board has been reset
  cy.get('.cell').each(($cell) => {
    cy.wrap($cell).find('.tile').should('not.exist'); // Ensure all cells are empty
  });
});
