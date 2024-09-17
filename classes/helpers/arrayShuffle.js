// shuffle array - sorts/"shuffles" the element of an array in random order
export default function shuffleArray ( arr ) {
  return arr
    .map( el => ( { value: el, sort: Math.random() } ) )
    .sort( ( a, b ) => a.sort - b.sort )
    .map( el => el.value );
}
