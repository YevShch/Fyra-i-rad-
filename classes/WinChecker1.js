import WinCombo from "./WinCombo.js";

export default class WinChecker {

  constructor ( board ) {
    this.board = board;
    this.matrix = board.matrix;
    this.winCombos = [];
    this.calculateWinCombos();
  }

  // Calculate all possible winning combinations for Connect-4
  calculateWinCombos () {
    // let m = this.matrix;
    // // Represent possible winning patterns as offsets from one position on the board
    // let offsets = [
    //   [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],  // horizontal win
    //   [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],  // vertical win
    //   [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],  // diagonal win (bottom-left to top-right)
    //   [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ] // diagonal win (top-left to bottom-right)
    // ];

    // // Loop through the board to find all possible winning combinations
    // for ( let r = 0; r < m.length; r++ ) {
    //   for ( let c = 0; c < m[ 0 ].length; c++ ) {
    //     // Check all types of wins
    //     for ( let winType of offsets ) {
    //       let combo = [];
    //       for ( let [ ro, co ] of winType ) {
    //         // Check if the combo goes out of bounds
    //         if ( r + ro < 0 || r + ro >= m.length ) { continue; }
    //         if ( c + co < 0 || c + co >= m[ 0 ].length ) { continue; }
    //         combo.push( [ r + ro, c + co ] );  // Store the coordinates of winning positions
    //       }
    //       // If all 4 positions are found, add the combo to the list
    //       if ( combo.length === 4 ) {
    //         // this.winCombos.push( new WinCombo( combo ) ); 
    //         let cellCombo = combo.map( ( [ row, col ] ) => this.matrix[ row ][ col ] );
    //         this.winCombos.push( new WinCombo( cellCombo ) );
    //       }
    //     }
    //   }
    // }
    
   
      let m = this.matrix;
      let offsets = [
        [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],
        [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],
        [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],
        [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ]
      ];

      
        // r = row, c = column
        for ( let r = 0; r < m.length; r++ ) {
          for ( let c = 0; c < m[ 0 ].length; c++ ) {
            // ro = row offset, co = column offset
            for ( let winType of offsets ) {
             
              let combo = [];
              for ( let [ ro, co ] of winType ) {
                combo.push(m [ r + ro ] [ c + co ]);
              }
              if ( combo.length === 4 ) {
              this.winCombos.push(new WinCombo(combo))
              }
            }
          }
        }
      
  }

  // Check if there's a winner
  winCheck () {
    for ( let winCombo of this.winCombos ) {
      if ( winCombo.isWin( 'red' ) ) { this.board.winningCombo = winCombo; return 'red'; }
      if ( winCombo.isWin( 'yellow' ) ) { this.board.winningCombo = winCombo; return 'yellow'; }
    }
    return false;
  }
}
