import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

Given('that there are two players, and one creates a game while the other joins it', () => {
  // TODO: implement step
  // visit the 'helper' we set up with two iframes
  // where each iframe emulates one player in a network
  cy.visit( '/iframed-network-play.html' );

  // player red - first player - start network game and get code
  getIframeBody( 'iframe#playerRed' ).find( '.button.Yes' ).click();
  getIframeBody( 'iframe#playerRed' ).find( '.button.Create' ).click();
  getIframeBody( 'iframe#playerRed' ).find( 'input[name="answer"]' ).type( 'Anna{enter}' );
  getIframeBody( 'iframe#playerRed' ).find( 'input[name="joinCode"]' ).then( element => {
    // we have the join code
    let joinCode = element.val();

    // player yellow - second player join the game
    getIframeBody( 'iframe#playerYellow' ).find( '.button.Yes' ).click();
    getIframeBody( 'iframe#playerYellow' ).find( '.button.Join' ).click();
    getIframeBody( 'iframe#playerYellow' ).find( 'input[name="answer"]' ).type( 'Beata{enter}' );
    getIframeBody( 'iframe#playerYellow' ).find( 'dialog:contains("join code") input[name="answer"]' )
      .type( joinCode + '{enter}' );
    cy.wait( 1000 );
  } );
});

When('both players play the game until one of them wins', () => {
  // TODO: implement step
  for ( let i = 0; i < 4; i++ ) {
    getIframeBody( 'iframe#playerRed' ).find( `.cell.empty[data-column="1"]` ).first().should( 'be.visible' ).click();
    cy.wait( 1000 );
    getIframeBody( 'iframe#playerYellow' ).find( `.cell.empty[data-column="2"]` ).first().should( 'be.visible' ).click();
    cy.wait( 1000 );
  }
});

Then('the game declares the winner', () => {
  // Check the winning declaring on the red's player screen
  getIframeBody( 'iframe#playerRed' ).find( '.player-name' ) // Find the element with the class player-name
    .should( 'be.visible' ) // Ensure that the element is visible
    .and( 'have.text', 'Anna won!' ); // Check that the text in the element is 'Anna won!'
  cy.wait( 1000 );

  // Check the winning declaring on the yellow's player screen
  getIframeBody( 'iframe#playerRed' ).find( '.player-name' )
    .should( 'be.visible' ) 
    .and( 'have.text', 'Anna won!' ); 
  cy.wait( 1000 );
});

Then('the victory confetti animation is correctly displayed on both Player Red\'s and Player Yellow\'s screens', () => {
 
  getIframeBody( 'iframe#playerRed' ).find( '#confetti-container .confetti' )
    .should( 'have.length.greaterThan', 0 ) // Make sure that there is at least one element of confetti
    .should( 'be.visible' ); 
  
  // Check the same on the yellow player screen
  getIframeBody( 'iframe#playerYellow' ).find( '#confetti-container .confetti' )
    .should( 'have.length.greaterThan', 0 ) // Make sure that there is at least one element of confetti
    .should( 'be.visible' );
});

Then('the winning combination blinks on both Player Red\'s and Player Yellow\'s screens', () => {
 
  getIframeBody( 'iframe#playerRed' ).find( '.cell[data-column="1"]' ) // Get all elements from the column with data-column="2"
    .filter( '.winning-cell' ) // Filter elements to only include those with the winning-cell class
    .should( 'have.length', 4 ); // Check that the number of elements is 4
  
  // Check the same on the yellow player screen
  getIframeBody( 'iframe#playerYellow' ).find( '.cell[data-column="1"]' )
    .filter( '.winning-cell' )
    .should( 'have.length', 4 );
});
