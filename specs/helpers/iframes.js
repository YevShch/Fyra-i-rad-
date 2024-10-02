// example from
// https://www.cypress.io/blog/working-with-iframes-in-cypress
// (slightly modified)

const getIframeDocument = cssSelectorForIframe => {
  return cy
    .get( cssSelectorForIframe )
    // Cypress yields jQuery element, which has the real
    // DOM element under property "0".
    // From the real DOM iframe element we can get
    // the "document" element, it is stored in "contentDocument" property
    // Cypress "its" command can access deep properties using dot notation
    // https://on.cypress.io/its
    .its( '0.contentDocument' ).should( 'exist' );
}

export const getIframeBody = cssSelectorForIframe => {
  // get the document
  return getIframeDocument( cssSelectorForIframe )
    // automatically retries until body is loaded
    .its( 'body' ).should( 'not.be.undefined' )
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then( cy.wrap );
}
