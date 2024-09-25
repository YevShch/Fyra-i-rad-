// https://ludolab.net/solve/connect4?position=4344447&level=3

// aiLevel = 1-10 (hur bra AI:n är)
// state - en sträng med alla drag hittills med kolumnerna mellan 1-7
// t.ex. '413' kan utläsas
// - spelare 1 spelade kolumn 4,
// - sedan spelade spelare 2 kolumn 1,
// - sedan spelade spelare 1 kolumn 3
// export async function getMoveFromExternalAI ( aiLevel = ' ', state ) {
//   // console.log( `AI Level from Ludolab: ${ aiLevel }` );
//   // console.log( `Game State from Ludolab: ${ state }` );
//   let response = await ( await fetch( 'https://ludolab.net/solve/connect4?level=' + aiLevel + '&position=' + state ) ).json();
//   let movesSortedByHowGood = response.sort( ( a, b ) => a.score > b.score ? -1 : 1 );
//   return movesSortedByHowGood[ 0 ].move;
// }


export async function getMoveFromExternalAI ( aiLevel = ' ', state ) {
  // Fetch data about possible moves from the external AI
  let response = await ( await fetch( 'https://ludolab.net/solve/connect4?level=' + aiLevel + '&position=' + state ) ).json();

  // Sort moves by their score (from best to worst)
  let movesSortedByHowGood = response.sort( ( a, b ) => a.score > b.score ? -1 : 1 );

  // Check if there is a blocking move (the only move with a better score, while others are very negative)
  const blockingMove = movesSortedByHowGood.find( move => {
    // Check if all other moves have a score less than -10
    const allOthersAreBad = movesSortedByHowGood.every( otherMove => otherMove === move || otherMove.score <= -10 );
    return allOthersAreBad;
  } );

  let chosenMove;

  // Logic for selecting the move based on AI level
  if ( blockingMove && aiLevel >= 4 ) {
    // If there's a blocking move and the AI is "smart" (level 4+), prioritize blocking the opponent
    chosenMove = blockingMove.move;
  } else if ( aiLevel >= 10 ) {
    // For level 10, always select the best possible move
    chosenMove = movesSortedByHowGood[ 0 ].move;
  } else if ( aiLevel >= 7 && aiLevel <= 9 ) {
    // For levels 7-9, randomly select from the top 2 or 3 best moves
    const topMoves = movesSortedByHowGood.slice( 0, 3 );  // Take the top 3 moves
    const randomIndex = Math.floor( Math.random() * topMoves.length );
    chosenMove = topMoves[ randomIndex ].move;
  } else if ( aiLevel >= 4 && aiLevel <= 6 ) {
    // For levels 4-6, randomly select from the middle moves
    const middleStartIndex = Math.floor( movesSortedByHowGood.length / 3 ); // Start at 1/3 of the array
    const middleEndIndex = Math.ceil( ( movesSortedByHowGood.length * 2 ) / 3 ); // End at 2/3 of the array
    const middleMoves = movesSortedByHowGood.slice( middleStartIndex, middleEndIndex ); // Get the middle moves

    // If there are middle moves available
    if ( middleMoves.length > 0 ) {
      const randomIndex = Math.floor( Math.random() * middleMoves.length );
      chosenMove = middleMoves[ randomIndex ].move;
    } else {
      // Fallback if there are no middle moves
      chosenMove = movesSortedByHowGood[ Math.floor( Math.random() * movesSortedByHowGood.length ) ].move;
    }
  } else {
    // For levels 1-3, select a completely random move
    const randomIndex = Math.floor( Math.random() * movesSortedByHowGood.length );
    chosenMove = movesSortedByHowGood[ randomIndex ].move;
  }

  return chosenMove;
}


