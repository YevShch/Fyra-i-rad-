import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes";

Given('that there are two players, and one creates a game while the other joins it', () => {
  // TODO: implement step
  // visit the 'helper' we set up with two iframes
  // where each iframe emulates one player in a network
  cy.visit( '/iframed-network-play.html' );

  // player X - first player - start network game and get code
  getIframeBody( 'iframe#playerRed' ).find( '.button.Yes' ).click();
  getIframeBody( 'iframe#playerRed' ).find( '.button.Create' ).click();
  getIframeBody( 'iframe#playerRed' ).find( 'input[name="answer"]' ).type( 'Anna{enter}' );
  getIframeBody( 'iframe#playerRed' ).find( 'input[name="joinCode"]' ).then( element => {
    // we have the join code
    let joinCode = element.val();

    // player O - second player join the game
    getIframeBody( 'iframe#playerYellow' ).find( '.button.Yes' ).click();
    getIframeBody( 'iframe#playerYellow' ).find( '.button.Join' ).click();
    getIframeBody( 'iframe#playerYellow' ).find( 'input[name="answer"]' ).type( 'Beata{enter}' );
    getIframeBody( 'iframe#playerYellow' ).find( 'dialog:contains("join code") input[name="answer"]' )
      .type( joinCode + '{enter}' );
  } );
});

When('both players play the game until one of them wins', () => {
  // TODO: implement step
});

Then('the game declares the winner', () => {
  // TODO: implement step
});

Then('the victory confetti animation is correctly displayed on both Player Red\'s and Player Yellow\'s screens', () => {
  // TODO: implement step
});

Then('the winning combination blinks on both Player Red\'s and Player Yellow\'s screens', () => {
  // TODO: implement step
});
