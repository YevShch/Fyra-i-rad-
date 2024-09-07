import { Window } from 'happy-dom';
import fs from 'fs';

const bodyInitialContent = fs.readFileSync( 'index.html', 'utf-8' );

export default function getDocument () {
  // create a mocked browser window and get its document
  const document = new Window().document;
  // make document available to the program code
  globalThis.document = document;
  // create the basic html structure from index.html
  document.body.innerHTML = bodyInitialContent;
  // return document so we can use it in our tests
  return document;
}
