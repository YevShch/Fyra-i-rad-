import shuffleArray from "./helpers/arrayShuffle.js";
import sleep from './helpers/sleep.js';
import { getMoveFromExternalAI } from "./helpers/miner.js";

export default class Player {
  constructor ( name, type, color, board, aiLevel = null ) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.opponent = this.color === 'red' ? 'yellow' : 'red'; // Determine opponent color
    this.board = board;
    this.aiLevel = aiLevel; // Add aiLevel property to store AI level for External AI players
  }

  async makeBotMove () {
    console.log( 'makeBotMove has been called' );
    await sleep( 500 ); // Delay for bot's "thinking" to simulate human-like behavior
    let column;
    if ( this.type === 'A dumb bot' ) {
      [ column ] = this.makeDumbBotMove(); // Get a random column for a dumb bot
    } else if ( this.type === 'A smart bot' ) {
      [ column ] = this.makeSmartBotMove(); // Get the best column for a smart bot
    } else if ( this.type === 'External AI' ) {
      column  = await this.makeExternAIBotMove(); // Get the column for an extern AI bot
    }
    // await this.board.makeMove( this.color, column ); // Make the chosen move
     await this.board.makeMove( this.color, column ) 
   
  }


   async makeExternAIBotMove () {
    console.log( 'External AI has been called' );
     // Use the player's own aiLevel
     const aiLevel = this.aiLevel;
     console.log( 'External AI level is:', aiLevel );

    const stateString = this.generateStateString(); // Method to generate the game state string
   

    // Get the column for a move from the external AI
    const column =  await getMoveFromExternalAI( aiLevel, stateString );

    console.log( `Generated move by External AI: column ${ column }` );

    // Return the column
    return column - 1;
  }

  generateStateString () {
    let state = ' ';

    if ( this.board.movesHistory.length > 0 ) {
      // Convert the movesHistory array to a string 
      state = this.board.movesHistory.join( '' );
    }
    console.log('AI State', state)
    return state;
  }

  makeDumbBotMove () {
    console.log(' makeDumbBotMove was called')
    // Randomly select a legal move
    return [ shuffleArray( this.legalMoves )[ 0 ] ];
  }

  makeSmartBotMove () {
    // console.log( 'Matrix BEFORE a temporary move', this.board.matrix );

    // orgState - the current state on the board
    let orgState = this.state();
    // console.log( 'Current state', orgState );

    // store scores for each possible move in scores
    let scores = [];

    // loop through/try each legal/possible move
    for ( let column of this.legalMoves ) {
      // Find the lowest empty cell in a column
      let row = -1;
      for ( let r = this.board.matrix.length - 1; r >= 0; r-- ) {
        if ( this.board.matrix[ r ][ column ].color === ' ' ) {
          row = r;
          break;
        }
      }

      if ( row === -1 ) continue; // If there is no empty cell, skip the column

      let cell = this.board.matrix[ row ][ column ];
      cell.color = this.color; // make temporary move
      // console.log( 'Cell I would change', cell );
      // console.log( 'Matrix AFTER temporary move', this.board.matrix );

      let futureState = this.state(); // the state if we made this move
      cell.color = ' '; // undo temporary move

      // console.log( 'IF I MADE THE MOVE', column );
      // console.log( 'THE NEW STATE WOULD BE', futureState );

      // remember the score for this possible move
      scores.push( { column, score: this.score( orgState, futureState ) } );
    }

    scores = shuffleArray( scores ).sort( ( a, b ) => a.score > b.score ? -1 : 1 );
    console.log( 'Scores:', scores );
    let { column } = scores[ 0 ];
    return [ column ];
  }

  score ( orgState, futureState ) {
    // Define priorities for scoring moves
    let priorities = [
      { me: 4 }, { opp: 3 }, // Maximum priority: winning or blocking a win
      { me: 3 }, { opp: 2 }, // Good: creating a line of 3
      { me: 2 }, { opp: 1 }, // Intermediate: creating a line of 2
      { me: 1 } // Less important: placing 1 piece
    ];

    // score variable - which we will use to calculate a score
    let score = 0;

    // loop through each part of the states, corresponding to a winCombo
    for ( let i = 0; i < orgState.length; i++ ) {
      // short aliases for each orgState and futureState part
      // b - before/orgState, a - after/futureState
      let b = orgState[ i ], a = futureState[ i ];
      // no change in winCombo - not interesting
      if ( b.me === a.me && b.opp === a.opp ) { continue; }
      // winCombo can't be won by either player (both already have pieces in place)
      if ( b.me > 0 && b.opp > 0 ) { continue; }
      // there has been change in this winCombo, so I must have added a piece
      let partScore = '';
      // partScore is how good the move is for ONE winCombo
      // partScore will become number of different priorities x 2 long
      // initially it is a string, but we will convert to a number before
      // adding to the total score
      for ( let j = 0; j < priorities.length; j++ ) {
        let key = Object.keys( priorities[ j ] )[ 0 ];
        let value = priorities[ j ][ key ];
        if ( a[ key ] === value ) { partScore += '01'; }
        else { partScore += '00'; }
      }
      score += +partScore;
    }

    // Return the total score for the move
    return score;
  }

  get legalMoves () {
    let moves = [];
    // Iterate over each column to check for possible moves
    for ( let column = 0; column < this.board.matrix[ 0 ].length; column++ ) {
      // Check from the bottom-most row upwards
      for ( let row = this.board.matrix.length - 1; row >= 0; row-- ) {
        if ( this.board.matrix[ row ][ column ].color === ' ' ) {
          moves.push( column ); // Add column to list of legal moves
          break; // Exit loop as we found an available slot
        }
      }
    }
    console.log( 'Legal moves:', moves );
    return moves; // Return the list of legal columns
  }

  state () {
    let state = [];
    // Evaluate each winning combination to determine the board state
    for ( let winCombo of this.board.winChecker.winCombos ) {
      state.push( {
        me: winCombo.numberOfCells( this.color ),
        opp: winCombo.numberOfCells( this.opponent )
      } );
    }
    return state; // Return the state of the board
  }
}
