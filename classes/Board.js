import Cell from './Cell.js';
import WinChecker from './WinChecker.js';


export default class Board {

  constructor ( app ) {
    this.app = app;
    this.matrix = [ ...new Array( 6 ) ].map( ( _, rowIndex ) =>
      [ ...new Array( 7 ) ].map( ( _, columnIndex ) =>
        new Cell( rowIndex, columnIndex )
      ) );
    // create a new winChecker
    this.winChecker = new WinChecker( this );
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'red'; 
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = null;
  }

  render () {
    // Create the click handler for the column
    // makeMove and if makeMove returns true
    // then call the app render method
    globalThis.makeMoveOnClick = ( column ) => 
       this.makeMove( this.currentPlayerColor, column, true )  
      && this.app.render();
    
    // Create the hide preview handlers
    globalThis.hidePreview = ( column ) => {
      document.querySelectorAll( `.cell[data-column="${ column }"]` ).forEach( cell => {
        cell.classList.remove( 'preview' );
        cell.style.backgroundColor = '';
      } );
    };


    // Create the hover handlers
    globalThis.showPreview = ( column ) => {
      // Find the lowest empty cell in the column
      const cells = document.querySelectorAll( `.cell[data-column="${ column }"]` );
      for ( let i = cells.length - 1; i >= 0; i-- ) {
        const cell = cells[ i ];
        if ( cell.classList.contains( 'empty' ) ) {
          cell.classList.add( 'preview' );
          cell.style.backgroundColor = this.currentPlayerColor === 'red' ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,0,0.5)';
          break;
        }
      }
    };
    
    // Set game statuses in the body for styling purposes
    document.body.setAttribute( 'currentPlayerColor',
      this.gameOver ? '' : this.currentPlayerColor );
    document.body.setAttribute( 'gameInProgress',
      this.app.namesEntered && !this.gameOver );
    
    // Render the game board as HTML
    return /*html*/`<div class="board">
      ${ this.matrix.map( ( row, rowIndex ) =>
      row.map( ( cell, columnIndex ) => /*html*/`
          <div
            class="cell ${ cell === 'red' ? 'red' : ( cell === 'yellow' ? 'yellow' : 'empty' ) } 
                  ${ this.winningCombo && this.winningCombo.some( ( [ r, c ] ) => r === rowIndex && c === columnIndex ) ? 'winning-cell' : '' }"
            data-column="${ columnIndex }"
            onmouseover="showPreview(${ columnIndex })"
            onmouseout="hidePreview(${ columnIndex })"
            onclick="makeMoveOnClick(${ columnIndex })">
            <div class="circle"></div>
          </div>
        `).join( '' ) ).join( '' ) }
    </div>`;
}
   

  makeMove ( color, column, fromClick ) {
    // let player = color === 'red' ? this.app.playerRed : this.app.playerYellow;

    // // don't allow move fromClick if it's a bot's turn to play
    // if ( fromClick && player.type !== 'Human' ) { return; }

    // check that the game is not over
    if ( this.gameOver ) { return false; }

    // check that the color is red or yellow - otherwise don't make the move
    if ( color !== 'red' && color !== 'yellow' ) { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if ( color !== this.currentPlayerColor ) { return false; }

    // check that the column is a number - otherwise don't make the move
    if ( isNaN( column ) ) { return false; }

    // check that the column is between 0 and 6 - otherwise don't make the move
    if ( column < 0 || column >= this.matrix[ 0 ].length ) { return false; }

    // check that column is not full
    if ( this.matrix[ 0 ][ column ].color !== ' ' ) { return false; }

    // Iterate through rows from bottom to top to find the first empty slot
    for ( let r = this.matrix.length - 1; r >= 0; r-- ) {
      if ( this.matrix[ r ][ column ].color === ' ' ) {
        this.matrix[ r ][ column ] = this.currentPlayerColor;
        console.log( `Move made by ${ this.currentPlayerColor } at (${ r }, ${ column })` );

        // check if someone has won or if it's a draw/tie and update properties
        this.winner = this.winCheck();
        this.isADraw = this.drawCheck();
        // the game is over if someone has won or if it's a draw
        this.gameOver = this.winner || this.isADraw;
        // change the current player color, if the game is not over
        !this.gameOver
          && ( this.currentPlayerColor = this.currentPlayerColor === 'red' ? 'yellow' : 'red' );
        // make bot move if the next player is a bot
        this.initiateBotMove();
        // return true if the move could be made
        return true;
      }
    }

    return false;  // No valid move made
  }


  winCheck ( row, col ) {
    return this.winChecker.winCheck();
  };


  drawCheck () {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() &&
      !this.matrix.flat().map( cell => cell.color ).includes( ' ' );
  }

  // note: this does nothing if the player is a human
  async initiateBotMove () {
    // get the current player
    let player = this.currentPlayerColor === 'red' ? this.app.playerRed : this.app.playerYellow;
    // if the game isn't over and the player exists and the player is non-human / a bot
    if ( !this.gameOver && player && player.type !== 'Human' ) {
      document.body.classList.add( 'botPlaying' );
      await player.makeBotMove();
      this.app.render();
      document.body.classList.remove( 'botPlaying' );
    }
  }

}
 
