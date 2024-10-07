import { And, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

// // Player1 sends the join code to Player2
When('that we are two players and one creates a game and one joins it', () => {
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
 
// Expect both players to have 'X: Nile's turn...' displayed on their screens
Then('we should both see that its the first players turn', () => {
  getIframeBody( 'iframe#playerRed' ).find( '.player-name' ).should( 'be.visible' )
    .and( 'have.text', `Nile's turn...` );

  getIframeBody('iframe#playerYellow').find( '.player-name' ).should( 'be.visible' )
  .and( 'have.text', `Nile's turn...` );

});



