//Testa att spelet laddas korrekt när användaren öppnar sidan.

// Verifiera att alla nödvändiga element, som spelbrädet,
//spelknappar och spelinformation, visas på sidan. (visas titeln "CONNECT FOUR", visas medelandet "Waiting for player names..." 
    
import { test, expect } from 'vitest';
import App from '../classes/App.js';
import getDocument from './helpers/mock-help/getDocument.js';
import registerPlayers from './helpers/commonTasks/registerPlayers.js';

test('Verify that the board is rendered', () => {
  let { body } = getDocument();
  new App();
  const message = body.querySelector('main p');
  expect(message).toBeTruthy();

});

test('Does the board contain 42 cells?', () => {
  let { body } = getDocument();
  new App();
  let board = body.querySelector('.board');
  let cells = board.querySelectorAll('.cell')
  expect(cells.length).toBe(42);
});

test('Does the logo/headline have the text Connect Four" ?', () => {
      let { body } = getDocument();
      new App();
      // check that the h1 contains the text "Connect Four";
      let h1 = body.querySelector('h1');
  expect(h1.innerText).contains("Connect Four");
});

test('Check if the "Waiting for player names..." message is shown', () => {
  let { body } = getDocument();
  new App();
  const message = body.querySelector('main p');
  expect(message).toBeTruthy();
  expect(message.innerText).toContain('Waiting for player names...');
});

test('Check if the dialog box is present', () => {
  let { body } = getDocument();
  new App();
  const message = body.querySelector('div.dialog-content');
  expect(message).toBeTruthy();
  expect(message.innerText).toContain('Enter the name of player');
});
    
test('Check that player names are registrered correctly', async () => {
  await registerPlayers();
});

