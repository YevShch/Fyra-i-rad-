import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getIframeBody } from "../helpers/iframes.js";

// Given('there are two players, and one creates a game while the other joins it', () => {
//   // TODO: implement step
// });

let boardStateBefore;

When( 'both players have made a few moves', () => {
  // TODO: implement step
  getIframeBody( 'iframe#playerRed' ).find( `.cell.empty[data-column="1"]` ).first().should( 'be.visible' ).click();
  cy.wait( 1000 );

  getIframeBody( 'iframe#playerYellow' ).find( `.cell.empty[data-column="2"]` ).first().should( 'be.visible' ).click();
  cy.wait( 1000 );

  getIframeBody( 'iframe#playerRed' ).find( `.cell.empty[data-column="1"]` ).first().should( 'be.visible' ).click();
  cy.wait( 1000 );

  getIframeBody( 'iframe#playerYellow' ).find( `.cell.empty[data-column="2"]` ).first().should( 'be.visible' ).click();
  cy.wait( 1000 );

  // change the board state
  getIframeBody( 'iframe#playerRed' ).find( '.cell' ).then( cells => {
    boardStateBefore = [ ...cells ].map( cell => cell.className ); // Saving cell classes
  } );
} );

When( 'player Red clicks on the {string} button', ( buttonName ) => {
  // TODO: implement step
  getIframeBody( 'iframe#playerRed' ).contains( '.button', buttonName ).should( 'be.visible' ).click();
} );

When( 'player Red chooses {string} from the menu', ( buttonName ) => {
  // TODO: implement step
  getIframeBody( 'iframe#playerRed' )
    .find( `input[type="submit"][value="${ buttonName }"]` )
    .should( 'be.visible' )
    .click();
} );

Then( 'the game board should be displayed without any changes on both Player Red\'s and Player Yellow\'s screens', () => {
  // After clicking, check the state of the board
  getIframeBody( 'iframe#playerRed' ).find( '.cell' ).then( cells => {
    const boardStateAfter = [ ...cells ].map( cell => cell.className );

    // Comparing the states before and after
    expect( boardStateBefore ).to.deep.equal( boardStateAfter );
  } );
} );

/* No duplicate steps, this one already above
When('player Red chooses {string} from the menu', (a) => {});*/

Then( 'the game board should be rendered on both Player Red\'s and Player Yellow\'s screens', () => {
  
  getIframeBody( 'iframe#playerRed' ).find( '.cell' ).each( ( $cell ) => {
 // Check that each cell has class 'empty'
    cy.wrap( $cell ).should( 'have.class', 'empty' );
  } );
  cy.wait( 3000 );
  getIframeBody( 'iframe#playerYellow' ).find( '.player-name' ).contains( 'Beata\'s turn...' )
    .should( 'be.visible' ) // Ensure that the element is visible
  
  getIframeBody( 'iframe#playerYellow' ).find( '.cell' ).each( ( $cell ) => {
    // Check that each cell on the board has class 'empty'
    cy.wrap( $cell ).should( 'have.class', 'empty' );
  } );
} );

Then( 'the turn message should display that it is Player Yellow\'s turn on both screens', () => {
  //  Check the winning declaring on the red's player screen
  getIframeBody( 'iframe#playerRed' ).find( '.player-name' ) // Find the element with the class player-name
    .should( 'be.visible' ) // Ensure that the element is visible
    .and( 'have.text', 'Beata\'s turn...' ); // Check that the text in the element is 'Anna won!'
  cy.wait( 1000 );

  // Check the winning declaring on the yellow's player screen
  getIframeBody( 'iframe#playerRed' ).find( '.player-name' )
    .should( 'be.visible' )
    .and( 'have.text', 'Beata\'s turn...' );
  cy.wait( 1000 );
} );

/* No duplicate steps, this one already above
When('player Red chooses {string} from the menu', (a) => {});*/

Then( 'Player Red should receive the message {string}', ( message ) => {
  // check that player Red recived the message 
  getIframeBody( 'iframe#playerRed' ).find( '.dialog-question' )
    .should( 'exist' )
    .contains( new RegExp( message.replace( /\s+/g, '\\s*' ), 'i' ) )  // Regular expression to account for line breaks
    .should( 'be.visible' );
} );
