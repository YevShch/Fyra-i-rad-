import WinCombo from "./WinCombo.js";

export default class WinChecker {

  constructor ( board ) {
    this.board = board;
    this.matrix = board.matrix;
    this.winCombos = [];
    this.calculateWinCombos();
  }


  // calculate all the win combos once and remember them
  // this programming pattern is called memoization
  // (and helps save processing power / speeds up the program)
  calculateWinCombos () {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],  // горизонтальная победа
      [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],  // вертикальная победа
      [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],  // диагональная победа (слева снизу вверх направо)
      [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ] // диагональная победа (слева сверху вниз направо)
    ];
    // loop through the board to find all winCombos

    // r = row, c = column
    for ( let r = 0; r < m.length; r++ ) {
      for ( let c = 0; c < m[ 0 ].length; c++ ) {
  
        for ( let winType of offsets ) {
          let combo = [];
          for ( let [ ro, co ] of winType ) {
            if ( r + ro < 0 || r + ro >= m.length ) { continue; }
            if ( c + co < 0 || c + co >= m[ 0 ].length ) { continue; }
            combo.push( m[ r + ro ][ c + co ] );
          }
          if ( combo.length === 4 ) {
            console.log( 'Combo:', combo );  // Вывод комбинации
            this.winCombos.push( new WinCombo( combo ) );
            // this.winCombos.push( combo ); // сохраняем комбинации координат
          }
        }
      }
    }
  }

  winCheck () {
    for ( let winCombo of this.winCombos ) {
      if ( winCombo.isWin( 'red' ) ) { this.board.winningCombo = winCombo; return 'red'; }
      if ( winCombo.isWin( 'yellow' ) ) { this.board.winningCombo = winCombo; return 'yellow'; }
    }
    return false;
  }

  // // Calculate all possible winning combinations for Connect-4
  // calculateWinCombos () {
  //   let m = this.matrix;
  //   // Represent possible winning patterns as offsets from one position on the board
  //   let offsets = [
  //     [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],  // horizontal win
  //     [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],  // vertical win
  //     [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],  // diagonal win (bottom-left to top-right)
  //     [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ] // diagonal win (top-left to bottom-right)
  //   ];

  //   // Loop through the board to find all possible winning combinations
  //   for ( let r = 0; r < m.length; r++ ) {
  //     for ( let c = 0; c < m[ 0 ].length; c++ ) {
  //       // Check all types of wins
  //       for ( let winType of offsets ) {
  //         let combo = [];
  //         for ( let [ ro, co ] of winType ) {
  //           // Check if the combo goes out of bounds
  //           if ( r + ro < 0 || r + ro >= m.length ) { continue; }
  //           if ( c + co < 0 || c + co >= m[ 0 ].length ) { continue; }
  //           combo.push( [ r + ro, c + co ] );  // Store the coordinates of winning positions
  //         }

  //         // Log the checked combination
  //         // console.log( `Checking combination: ${ combo.map( ( [ row, col ] ) => `(${ row }, ${ col })` ).join( ', ' ) }` );

  //         // If all 4 positions are found, add the combo to the list
  //         if ( combo.length === 4 ) {
  //           let cellCombo = combo.map( ( [ row, col ] ) => this.matrix[ row ][ col ] );
  //           this.winCombos.push( new WinCombo( cellCombo ) );
  //           // Log the found winning combination
  //           // console.log( 'Winning combination added:', combo );
  //         }
  //       }
  //     }
  //   }
  // }

  // // Check if there's a winner
  // winCheck () {
  //   console.log( 'Checking for a winner...' );
  //   for ( let winCombo of this.winCombos ) {
  //     if ( winCombo.isWin( 'red' ) ) {
  //       this.board.winningCombo = winCombo;
  //       console.log( 'Winner found: Red' );
  //       return 'red';
  //     }
  //     if ( winCombo.isWin( 'yellow' ) ) {
  //       this.board.winningCombo = winCombo;
  //       console.log( 'Winner found: Yellow' );
  //       return 'yellow';
  //     }
  //   }
  //   console.log( 'No winner found' );
  //   return false;
  // }




  // // Calculate all possible winning combinations for Connect-4
  // calculateWinCombos () {
  //   let m = this.matrix;
  //   // Represent possible winning patterns as offsets from one position on the board
  //   let offsets = [
  //     [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],  // horizontal win
  //     [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],  // vertical win
  //     [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],  // diagonal win (bottom-left to top-right)
  //     [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ] // diagonal win (top-left to bottom-right)
  //   ];

  //   // Loop through the board to find all possible winning combinations
  //   for ( let r = 0; r < m.length; r++ ) {
  //     for ( let c = 0; c < m[ 0 ].length; c++ ) {
  //       // Check all types of wins
  //       for ( let winType of offsets ) {
  //         let combo = [];
  //         for ( let [ ro, co ] of winType ) {
  //           // Check if the combo goes out of bounds
  //           if ( r + ro < 0 || r + ro >= m.length ) { continue; }
  //           if ( c + co < 0 || c + co >= m[ 0 ].length ) { continue; }
  //           combo.push( [ r + ro, c + co ] );  // Store the coordinates of winning positions
  //         }
  //         // If all 4 positions are found, add the combo to the list
  //         if ( combo.length === 4 ) {
  //           // this.winCombos.push( new WinCombo( combo ) ); 
  //           let cellCombo = combo.map( ( [ row, col ] ) => this.matrix[ row ][ col ] );  
  //           this.winCombos.push( new WinCombo( cellCombo ) );  
  //         }
  //       }
  //     }
  //   }
  // }

  // // Check if there's a winner
  // winCheck ( row, col ) {
  //   console.log( 'Function winCheck was called!' );
  //   for ( let winCombo of this.winCombos ) {
  //     if ( winCombo.isWin( 'red' ) ) { this.board.winningCombo = winCombo; return 'red'; }
  //     if ( winCombo.isWin( 'yellow' ) ) { this.board.winningCombo = winCombo; return 'yellow'; }
  // console.log('Status')
  //   }
  //   return false;
  // }
}
