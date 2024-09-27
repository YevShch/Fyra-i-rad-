export async function getMoveFromExternalAI ( aiLevel = ' ', state ) {
  let response = await ( await fetch( 'https://ludolab.net/solve/connect4?level=' + aiLevel + '&position=' + state ) ).json();
  let moveFromExternalAI = response[ 0 ].move;
  return moveFromExternalAI;
}
