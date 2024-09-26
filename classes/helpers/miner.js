// https://ludolab.net/solve/connect4?position=4344447&level=3

// aiLevel = 1-10 (hur bra AI:n är)
// state - en sträng med alla drag hittills med kolumnerna mellan 1-7
// t.ex. '413' kan utläsas 
// - spelare 1 spelade kolumn 4, 
// - sedan spelade spelare 2 kolumn 1, 
// - sedan spelade spelare 1 kolumn 3
export async function getMoveFromExternalAI ( aiLevel = ' ', state ) {
  let response = await ( await fetch( 'https://ludolab.net/solve/connect4?level=' + aiLevel + '&position=' + state ) ).json();
  let movesSortedByHowGood = response[ 0 ].move;
  return movesSortedByHowGood;
}
