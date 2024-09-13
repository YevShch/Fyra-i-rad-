import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Go to the game page
Then('I am on the game page', () => {
  cy.visit('http://localhost:5173/');  // Oyun sayfasına git
  cy.get('main').should('be.visible'); // Ana ekranın göründüğünden emin ol
});

// Write the player 1
Given('Enter the first players name {string}', (name) => {
 
  // Write the player's name and send the form
  cy.get('input[name="answer"]')
    .type(name)
    .should('have.value', name)
    .type('{enter}');
  cy.wait(1000); // Wait for sending 
});

// Write the player 2
And('Enter the second players name {string}', (name) => {
   cy.contains( 'Enter the name of player' ).should( 'be.visible' );
  cy.get( 'input[name="answer"]' )
    .type( name )
    .should( 'have.value', name )
    .type( '{enter}' );
  cy.wait( 1000 );
});

//Check if the game starts correctly when it starts
When('the game starts', () => {
  cy.get('.board').should('exist'); // Yeni bir board'ın olup olmadığını kontrol et
});

// Verify that Player 1 won the game
Then('Player1 wins the game', () => {
cy.contains('Player 1 wins').should('be.visible'); // Kazanan mesajını doğrula
});

// Verify that the "New game" button appears
And('I should see the "New game" button', () => {
  cy.contains('New game').should('be.visible'); // Verify that the "New game" button appears
    cy.wait( 3000 );
});

When( 'the game restarts', () => {
  cy.get( '.button' ).contains( 'New game' ).click();
  cy.wait( 1000 );
} );

// Check the game starts with new player names
Then('the game should start with player {string} as {string}', (playerName, color) => {
  const colorClass = color === 'red' ? 'red-circle' : 'yellow-circle';
  cy.contains(`${playerName}'s turn`).should('be.visible'); // Check the message that it is the player's turn
  cy.get(`.${colorClass}`).should('exist'); // Check that the correct colored circle exists
  cy.get('.board').should('exist'); // Check out the new board
});

And('a new board is displayed', () => {
  cy.get('.board').should('exist'); // Verify new board item exists
  cy.get('.board').should('be.visible'); // Verify that the board is visible
});

// Check that the game starts with the correct player's turn
And('it should be {string}\'s turn with the red circle shown', (playerName) => {
  cy.contains(`${playerName}'s turn`).should('be.visible'); // Check the message that it is the player's turn
  cy.get('.red-circle').should('exist'); // Check that the red circle exists
});


