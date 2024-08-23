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

      //check that input is valid (between 1 and 7 and is a number)
      if ( isNaN( column ) || column < 0 || column >= this.matrix[ 0 ].length ) {
          console.log( "Ogiltigt drag. Försök igen." );
          return false;
      }

      // check that column is not full
      if ( this.matrix[ 0 ][ column ] !== ' ' ) {
          console.log( "Kolumnen är full. Försök igen." );
          return false;
      }

      //make move 
      for ( let r = this.matrix.length - 1; r >= 0; r-- ) {
          if ( this.matrix[ r ][ column ] === ' ' ) {
              this.matrix[ r ][ column ] = this.currentPlayerColor;
              // console.log( `Placed ${ this.currentPlayerColor } in column ${ column }, row ${ r }` );
              this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
              this.winner = this.winCheck();
              this.isADraw = this.drawCheck();
              this.gameOver = this.winner || this.isADraw;

              // console.log( "After move:" );
              // console.log( "Current player:", this.currentPlayerColor );
              // console.log( "Game over:", this.gameOver );
              return true;
          }
      }
      return false;
  }



  winCheck () {
      let m = this.matrix;
      let offsets = [
          [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],
          [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],
          [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],
          [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ]
      ];

      for ( let color of 'XO' ) {
          // r = row, c = column
          for ( let r = 0; r < m.length; r++ ) {
              for ( let c = 0; c < m[ 0 ].length; c++ ) {
                  // ro = row offset, co = column offset
                  for ( let winType of offsets ) {
                      let colorsInCombo = '';
                      for ( let [ ro, co ] of winType ) {
                          colorsInCombo += ( m[ r + ro ] || [] )[ c + co ];
                      }
                      if ( colorsInCombo === color.repeat( 4 ) ) {
                          // this.winner = color; // save the winner
                          // return true; // return true, if someone win
                          return color;
                      }
                  }
              }
          }
      }
      return false;
  }

  drawCheck () {
      return !this.winCheck() && !this.matrix.flat().includes( ' ' );
  }
}


