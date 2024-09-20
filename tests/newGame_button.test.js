import { expect, test } from 'vitest';
import getDocument from './helpers/mock-help/getDocument.js';
import waitUntil from './helpers/mock-help/waitUntil.js';
import click from './helpers/mock-help/triggerOnclick.js';
import registerPlayers from './helpers/commonTasks/registerPlayers.js';
import App from '../classes/App.js';


// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

test( 'Verify board updates correctly after pressing "New game" button', async () => {
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

  // Wait for the winning message
  try {
    await waitUntil( () => body.querySelector( 'main p' ).textContent.includes( 'Eva won!' ), 500 );
    console.log( 'Winning message is shown.' );
  } catch ( error ) {
    console.error( 'Error waiting for winning message:', error );
  }

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

  // Wait until namesEntered returns true for new game
  try {
    await waitUntil( () => globalThis.appInstance && globalThis.appInstance.namesEntered, 3000 );
    console.log( 'New names entered.' );
  } catch ( error ) {
    console.error( 'Error waiting for namesEntered after new game:', error );
  }

  // Wait until the new names are entered
  try {
    await waitUntil( () => body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ), 3000 );
    console.log( 'Player names are being requested again.' );
  } catch ( error ) {
    console.error( 'Error waiting for new player names:', error );
  }

  // Ensure the new instance is created and available
  let newApp = globalThis.appInstance;
  expect( newApp ).toBeDefined(); // Check that newApp is not undefined
  console.log( 'New app instance:', newApp );

  // Check that the new app instance has the correct player names
  expect( newApp.playerRed ).toBeDefined(); // Ensure playerRed is defined
  expect( newApp.playerYellow ).toBeDefined(); // Ensure playerYellow is defined
  expect( newApp.playerRed.name ).toBe( 'Max' );
  expect( newApp.playerYellow.name ).toBe( 'Ola' );

  // Check that the next turn message is correct
  await waitUntil( () => body.querySelector( 'main p' ).innerText.includes( " Max's turn..." ), 500 );
  const turnMessage = body.querySelector( 'main p' ).innerText;
  expect( turnMessage ).toContain( " Max's turn..." );


  await waitUntil( () => body.querySelector( 'main p' ).innerText.includes( " Max's turn..." ), 500 );
  let board = body.querySelector( '.board' );
  expect( board ).toBeDefined();

  // Check that the board is empty
  const allCells = document.querySelectorAll( '.cell' ); // Select all elements in the board
  allCells.forEach( cell => {
    expect( cell.classList.contains( 'empty' ) ).toBeTruthy(); // Check that each cell has the class 'empty'
  } );

}, 25000 );





async function enterPlayers ( playerRedName, playerYellowName ) {
  let { body } = getDocument();

  // Устанавливаем mock-ответы для диалога ввода имен игроков
  globalThis.mockAnswers = [ playerRedName, playerYellowName ];

  // Создаем экземпляр игры
  let app = new App();

  // Убедимся, что игра была успешно создана
  expect( app ).toBeDefined();

  // Ждем, пока имена игроков будут введены, и убирается сообщение о вводе имен
  try {
    await waitUntil( () =>
      !body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ), 5000 // Увеличен тайм-аут
    );
    console.log( 'Player names are no longer being requested.' );
  } catch ( error ) {
    console.error( 'Error waiting for player names:', error );
  }

  // Убедимся, что объекты playerRed и playerYellow созданы, и их имена правильные
  expect( app.playerRed ).toBeDefined();
  expect( app.playerYellow ).toBeDefined();
  expect( app.playerRed.name ).toBe( playerRedName );
  expect( app.playerYellow.name ).toBe( playerYellowName );

  // Проверим, что сообщение о ходе правильное
  await waitUntil( () =>
    body.querySelector( 'main p' ).innerText.includes( `${ playerRedName }'s turn...` ), 5000 // Увеличен тайм-аут
  );
  const message = body.querySelector( 'main p' ).innerText;
  expect( message ).toContain( `${ playerRedName }'s turn...` );

  return body;
}


test( 'Check that the system registers players correctly', async () => {
  let { body } = getDocument();
  let playerRedName = 'Eva';
  let playerYellowName = 'Ola';
  globalThis.mockAnswers = [ playerRedName, playerYellowName ];

  let app = new App();

  // // Wait until namesEntered returns true
  // try {
  //   await waitUntil( () => app.namesEntered, 500 );
  //   console.log( 'Names entered.' );
  // } catch ( error ) {
  //   console.error( 'Error waiting for namesEntered:', error );
  // }

  // Wait until the DOM does not have a p tag in the main tag with 'Enter names'
  try {
    await waitUntil( () =>
      !body.querySelector( 'main p' ).innerText.includes( 'Waiting for player names...' ), 2000
    );
    console.log( 'Player names are no longer being requested.' );
  } catch ( error ) {
    console.error( 'Error waiting for player names:', error );
  }

  // Ensure playerRed and playerYellow are defined and their names are correct
  expect( app.playerRed ).toBeDefined();
  expect( app.playerYellow ).toBeDefined();
  expect( app.playerRed.name ).toBe( playerRedName );
  expect( app.playerYellow.name ).toBe( playerYellowName );

  // Check that the turn message is correct
  await waitUntil( () =>
    body.querySelector( 'main p' ).innerText.includes( `${ playerRedName }'s turn...` ), 2000
  );
  const message = body.querySelector( 'main p' ).innerText;
  expect( message ).toContain( `${ playerRedName }'s turn...` );
  return body;
} )
