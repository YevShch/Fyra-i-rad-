export default function createConfetti () {
  // Create a confetti container and add it to the body
  const confettiContainer = document.createElement( 'div' );
  confettiContainer.id = 'confetti-container';
  document.body.appendChild( confettiContainer );

  confettiContainer.innerHTML = '';

  const numConfetti = 150;
  for ( let i = 0; i < numConfetti; i++ ) {
    const confetti = document.createElement( 'div' );
    confetti.classList.add( 'confetti' );
    confetti.style.left = `${ Math.random() * 100 }vw`;
    confetti.style.top = `${ Math.random() * 100 }vh`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = `${ Math.random() * 10 + 10 }px`;
    confetti.style.height = confetti.style.width;
    confettiContainer.appendChild( confetti );
  }

  setTimeout( () => {
    confettiContainer.innerHTML = '';
  }, 5000 );
}


function getRandomColor () {
  const colors = [
    '#8CC0E6', '#FFD700', '#C0C0C0', '#FFA500', '#4CAF50',
    '#9C27B0', '#F48FB1', '#2196F3', '#4DB6AC', '#FFEB3B',
    '#8D6E63', '#03A9F4', '#E1BEE7'
  ];
  return colors[ Math.floor( Math.random() * colors.length ) ];
}
