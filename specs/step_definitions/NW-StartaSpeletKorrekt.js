import { And, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

// // Player1 sends the join code to Player2
When('One of the two players starts the game, the other joins the game', () => {
  cy.visit('/iframed-network-play.html');
  getIframeBody( 'iframe#playerRed' ).find( '.button.Yes' ).click();
  getIframeBody( 'iframe#playerRed' ).find( '.button.Create' ).click();
  getIframeBody( 'iframe#playerRed' ).find( 'input[name="answer"]' ).type( 'Nile{enter}' );
  getIframeBody( 'iframe#playerRed' ).find( 'input[name="joinCode"]' ).then( element => {
    // we have the join code
    let joinCode = element.val();

  // player yellow - second player join the game
  getIframeBody( 'iframe#playerYellow' ).find( '.button.Yes' ).click();
  getIframeBody( 'iframe#playerYellow' ).find( '.button.Join' ).click();
  getIframeBody( 'iframe#playerYellow' ).find( 'input[name="answer"]' ).type( 'Tuna{enter}' );
  getIframeBody( 'iframe#playerYellow' ).find( 'dialog:contains("join code") input[name="answer"]' )
    .type( joinCode + '{enter}' );
  cy.wait( 1000 );
} );
}); 
 
// The game is played until one of the players wins.
Then('The game is played until one of the players wins.', () => {
  for ( let i = 0; i < 4; i++ ) {
    getIframeBody( 'iframe#playerRed' ).find( `.cell.empty[data-column="1"]` ).first().should( 'be.visible' ).click();
    cy.wait( 1000 );
    getIframeBody( 'iframe#playerYellow' ).find( `.cell.empty[data-column="2"]` ).first().should( 'be.visible' ).click();
    cy.wait( 1000 );
  }
});

