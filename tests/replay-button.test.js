import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import click from './helpers/mock-help/triggerOnclick.js';
import App from '../classes/App.js';


// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test( "Check that players' turns are correct and the board is updated after pressing the 'Replay' button", async () => {
  let { body } = getDocument();
  globalThis.mockAnswers = [ 'Ove', 'Bengt' ];
  let app = new App();

  // Wait until the player names are entered
  try {
    await waitUntil( () => app.namesEntered, 500 );
    console.log( 'Names entered.' );
  } catch ( error ) {
    console.error( 'Error waiting for namesEntered:', error );
  }

  // Wait until the DOM does not have p tag in the main tag with 'Enter names'
  try {
    await waitUntil( () =>
      !body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ), 500 );
    console.log( 'Player names are no longer being requested.' );
  } catch ( error ) {
    console.error( 'Error waiting for player names:', error );
  }

  // Verify that player names have been entered
  expect( app.playerRed.name ).toBe( 'Ove' );
  expect( app.playerYellow.name ).toBe( 'Bengt' );
  

  // Simulate a game where Ove wins
  click( body.querySelector( '.cell[data-column="0"]' ) );
  click( body.querySelector( '.cell[data-column="1"]' ) );
  click( body.querySelector( '.cell[data-column="0"]' ) );
  click( body.querySelector( '.cell[data-column="1"]' ) );
  click( body.querySelector( '.cell[data-column="0"]' ) );
  click( body.querySelector( '.cell[data-column="1"]' ) );
  click( body.querySelector( '.cell[data-column="0"]' ) );

  // Wait for the winning message to appear
  await waitUntil( () => body.querySelector( 'main p' ).textContent.includes( 'Ove won!' ), 500 );
  const winningMessage = body.querySelector( 'main p' ).textContent;
  expect( winningMessage ).toContain( 'Ove won!' );


  globalThis.mockAnswers = [ 'OK' ];
  // Wait for the "Replay" button to appear and click it
  try {
    await waitUntil( () => body.querySelector( '.button[onclick="playAgain()"]' ), 500 );
    let playAgainBtn = body.querySelector( '.button[onclick="playAgain()"]' );
    expect( playAgainBtn ).toBeDefined();
    click( playAgainBtn );
  } catch ( error ) {
    console.error( 'Error waiting for "Play Again" button:', error );
  }

  // Wait for the dialog to close
  await waitUntil( () => !body.querySelector( 'div.dialog-content' ), 500 );
  console.log( 'Dialog should now be closed.' );


  // Verify that it is yellow player (Bengt's) turn
  await waitUntil( () => body.querySelector( 'main p' ).innerText.includes( "Bengt's turn..." ), 3000 );
  const turnMessage = body.querySelector( 'main p' ).innerText;
  expect( turnMessage ).toContain( "Bengt's turn..." );

  // Check that the board is defined
  let board = body.querySelector( '.board' );
  expect( board ).toBeDefined();

  // Check that the board is empty
  const allCells = document.querySelectorAll( '.cell' ); // Select all elements in the board
  allCells.forEach( cell => {
    expect( cell.classList.contains( 'empty' ) ).toBeTruthy(); // Check that each cell has the class 'empty'
  } );
  
}, 10000 )
