export default class Dialog {
  // call with await!
  ask ( question, limitedAnswers ) {

    // mock answer for tests
    let mockAnswers = globalThis.mockAnswers;
    if ( mockAnswers instanceof Array && mockAnswers.length > 0 ) {
      return mockAnswers.shift();
    }


    // render html for the dialog
    let dialogElement = document.querySelector( 'dialog' );
    dialogElement.innerHTML = /*html*/`
      <div class="dialog-content">
        ${ !question ? '' : `<div class="dialog-question">${ question }</div>` }
        <form method="dialog" name="dialog" onsubmit="return dialogAnswer(event)">
          ${ !limitedAnswers ?
            /*html*/`<input type="text" name="answer">` :
            /*html*/ `<div class="buttons">${ limitedAnswers.map( answer => /*html*/`
              <input
                onclick="globalThis.answer=this.value"
                type="submit" class="button ${ answer }" value="${ answer }"
              >
            `).join( '' ) }</div>` }
        </form>
      </div>`;
    dialogElement.showModal();

    // focus the input element
    document.forms.dialog.elements.answer?.focus();

    // for styling purposes:
    document.body.setAttribute( 'dialogOpen', true );

    // add an event handler for form submit
    globalThis.dialogAnswer = () =>
      this.answer( resolver, limitedAnswers );

    // return a promise
    // - it will be resolved by the answer method
    let resolver;
    return new Promise( resolve => resolver = resolve );
  }

  answer ( resolver, limitedAnswers ) {
    document.body.setAttribute( 'dialogOpen', false );
    if ( limitedAnswers ) { resolver( globalThis.answer ); return; }
    resolver( document.forms.dialog.elements.answer.value );
  }
}
