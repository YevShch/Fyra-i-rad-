import { expect } from 'vitest';
import getDocument from '../mock-help/getDocument.js';
import waitUntil from '../mock-help/waitUntil.js';

import App from '../../../classes/App.js';

// make the program sleep less (see classes/helpers/sleep.js)
globalThis.mockMinimalSleep = true;

// in several test we want to register the players by entering their names
// do this (including creating a new App) and return the body after its done
export default async function registerPlayers () {
  let { body } = getDocument();
  globalThis.mockAnswers = [ 'Anna', 'Beata' ];
  let app = new App();
  // wait until the dom does not have p tag in the main tag with 'Enter names'
  await waitUntil( () =>
    !body.querySelector( 'main p' ).innerText.includes( 'Enter names' ) );
  // has the app registered the players
  expect( app.playerX.name ).toBe( 'Anna' );
  expect( app.playerO.name ).toBe( 'Beata' );
  return body;
}
