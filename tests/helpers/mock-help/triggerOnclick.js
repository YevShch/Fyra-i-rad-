// click should work out of the box with Happy DOM
// el.click()
// but doesn't with our 'old school' onclick handlers
// so we create a small helper for click

export default function triggerOnclick ( element ) {
  // get the content inside 'onclick' - a call to a global function
  let onClick = element.getAttribute( 'onclick' );
  // create a wrapper function that calls the global function
  let f = new Function( 'globalThis.' + onClick );
  // call our wrapper function
  f();
}
