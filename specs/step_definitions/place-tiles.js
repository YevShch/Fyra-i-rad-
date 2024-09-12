import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Verify that the game is loaded and the board is empty
Given('the game is loaded and the board is empty', () => {
  cy.visit( 'http://localhost:5173/' );
  // Enter the player 1 name
  cy.get( 'input[name="answer"]' ).type( 'Anna' ).should( 'have.value', 'Anna' )
    .type( '{enter}' );
  cy.wait( 500 );
  // Enter the player 2 name
  cy.get( 'input[name="answer"]' ).type( 'Bengt' ) .should( 'have.value', 'Bengt' )
    .type( '{enter}' );
  cy.wait( 500 );
  
// Check that the board has 42 cells and they are empty
  cy.get('.cell', { timeout: 10000 }).should('have.length.gte', 42); // Check that there are enough cells
  cy.get('.cell.empty', { timeout: 10000 }).should('have.length.gte', 42); // Check that all cells are empty
});

// The red player places a tile in the first column
When('the red player places a tile in the first column', () => {
  cy.get('.cell[data-column="0"]').first().click({ force: true });
});

// Verify that the tile is placed correctly and the board updates
Then('the tile is placed correctly and the board updates', () => {
  cy.wait( 500 ); 
  //Check that the last cell has a class 'red' and not empty
  cy.get('.cell[data-column="0"]').last()
    .should('have.class', 'red').wait(500)
    .and('not.have.class', 'empty');
});


// Verify that the first column is full
Given( 'the first column is full', () => {
  //Fill the first column
  for ( let i = 0; i < 6; i++ ) {
    cy.get( `.cell.empty[data-column="0"]` ).first().should( 'be.visible' ).click();
    cy.wait( 500 );
  }
  // Check that all cells have not the class 'empty'
  cy.get( '.cell[data-column="0"]' ).each( ( cell ) => {
    cy.wrap( cell ).should( 'not.have.class', 'empty' );
  } );
} );


// The red player tries to place another tile in the full column
When('the red player tries to place another tile in the full column', () => {
  cy.get('.cell[data-column="0"]').first().click({ force: true });
});

// Verify that the tile is not placed
Then( 'the tile is not placed', () => {
  //Check that there are still 6 chips( that is, no new ones have been added )
  cy.get( '.cell[data-column="0"] .circle' ).should( 'have.length', 6 );
  
  // Check that topmost cell is still yellow (since it was yellow before)
  cy.get( '.cell[data-column="0"]' ).first().should( 'have.class', 'yellow' );
});

// Hover over the first column
When('the player hovers over the first column', () => {
  cy.get('.cell[data-column="0"]').first().trigger('mouseover');
});

// Verify that a preview of the tile position is shown
Then('a preview of the tile position is shown', () => {
  cy.get('.cell[data-column="0"]').last().should('have.class', 'preview');
});
