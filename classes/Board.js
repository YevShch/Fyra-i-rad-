export default class Board {
  constructor () {
    this.matrix = [ ...new Array( 6 ) ].map( () =>
      [ ...new Array( 7 ) ].map( () => ' ' )
    );
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  render () {
    let line = '\n' + '-'.repeat( 29 ) + '\n';
    console.log(
      line +
      this.matrix.map( row =>
        row.map( column => `| ${ column } ` ).join( '' )
        + '|' ).join( line ) +
      line
    );
  }

  makeMove ( color, column ) {
    // console.log( "Before move:" );
    // console.log( "Current player:", this.currentPlayerColor );
    // console.log( "Game over:", this.gameOver );

    if ( this.gameOver ) { return false; }

    // check that the color is X or O - otherwise don't make the move
    if ( color !== 'X' && color !== 'O' ) { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if ( color !== this.currentPlayerColor ) { return false; }

    // check that input is a valid integer (between 0 and 6)
    if ( !Number.isInteger( column ) || column < 0 || column >= this.matrix[ 0 ].length ) {
      console.log( "Ogiltigt drag. Försök igen." );
      return false;
    }

    // check that column is not full
    if ( this.matrix[ 0 ][ column ] !== ' ' ) {
      console.log( "Kolumnen är full. Försök igen." );
      return false;
    }  
    // if ( this.matrix.every( row => row[ column ] !== ' ' ) ) {
    //   return false; // Column is full
    // }

    //make move 
    for ( let r = this.matrix.length - 1; r >= 0; r-- ) {
      if ( this.matrix[ r ][ column ] === ' ' ) {
        this.matrix[ r ][ column ] = this.currentPlayerColor;
        // console.log( `Placed ${ this.currentPlayerColor } in column ${ column }, row ${ r }` );
        this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
      
        return true;
      }
    }
    return false;
  }
}
