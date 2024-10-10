import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import click from './helpers/mock-help/triggerOnclick.js';
import App from '../classes/App.js';


// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test( 'Check that board updates and players are created correctly after clicking "New Game"', async () => {
  let { body } = getDocument();
  globalThis.mockAnswers = [ 'Eva', 'Bengt', 'Max', 'Ola' ];
  let app = new App();

  // Wait until namesEntered returns true
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

  expect( app.playerRed ).toBeDefined(); // Ensure playerRed is defined
  expect( app.playerYellow ).toBeDefined(); // Ensure playerYellow is defined
  expect( app.playerRed.name ).toBe( 'Eva' );
  expect( app.playerYellow.name ).toBe( 'Bengt' );

  // Check that the turn message is correct
  await waitUntil( () => body.querySelector( 'main p' ).innerText.includes( " Eva's turn..." ), 500 );
  const message = body.querySelector( 'main p' ).innerText;
  expect( message ).toContain( " Eva's turn..." );

  let board1 = body.querySelector( '.board' );
  expect( board1 ).toBeDefined();

  // Simulate game moves
  click( body.querySelector( '.cell[data-column="0"]' ) );
  click( body.querySelector( '.cell[data-column="1"]' ) );
  click( body.querySelector( '.cell[data-column="0"]' ) );
  click( body.querySelector( '.cell[data-column="1"]' ) );
  click( body.querySelector( '.cell[data-column="0"]' ) );
  click( body.querySelector( '.cell[data-column="1"]' ) );
  click( body.querySelector( '.cell[data-column="0"]' ) );

// Declaire a new instance of App
  let newGameApp = new App(); 

  // Wait for the Play Again button and click it
  try {
    await waitUntil( () => body.querySelector( '.button[onclick="newPlayers()"]' ), 500 );
    let newPlayersBtn = body.querySelector( '.button[onclick="newPlayers()"]' );
    expect( newPlayersBtn ).toBeDefined();
    click( newPlayersBtn );
    console.log( 'Clicked "New game" button.' );
  } catch ( error ) {
    console.error( 'Error waiting for "New game" button:', error );
  }


  // Wait for the dialog to appear and simulate entering names
  try {
    await waitUntil( () => body.querySelector( 'div.dialog-content' ), 1000 );
    console.log( 'Dialog should be shown for new player names.' );
  } catch ( error ) {
    console.error( 'Error waiting for dialog content:', error );
  }


  // Wait until the DOM does not have p tag in the main tag with 'Enter names'
  try {
    await waitUntil( () =>
      !body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ), 500 );
    console.log( 'Player names are no longer being requested.' );
  } catch ( error ) {
    console.error( 'Error waiting for player names:', error );
  }
  
  
  expect( newGameApp.playerRed ).toBeDefined(); // Ensure playerRed is defined
  expect( newGameApp.playerYellow ).toBeDefined(); // Ensure playerYellow is defined
  expect( newGameApp.playerRed.name ).toBe( 'Max' );
  expect( newGameApp.playerYellow.name ).toBe( 'Ola' );


  // Check that the next turn message is correct
  await waitUntil( () => body.querySelector( 'main p' ).innerText.includes( " Max's turn..." ), 500 );
  const turnMessage = body.querySelector( 'main p' ).innerText;
  expect( turnMessage ).toContain( " Max's turn..." );

  // Check that the board is defined
  let board = body.querySelector( '.board' );
  expect( board ).toBeDefined(); 

  // Check that the board is empty
  const allCells = document.querySelectorAll( '.cell' ); // Select all elements in the board
  allCells.forEach( cell => {
    expect( cell.classList.contains( 'empty' ) ).toBeTruthy(); // Check that each cell has the class 'empty'
  } );

}, 25000 );

