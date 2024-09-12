import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Oyunun ana sayfasına git
Then('I am on the game page', () => {
  cy.visit('http://localhost:5173/');  // Oyun sayfasına git
  cy.get('main').should('be.visible'); // Ana ekranın göründüğünden emin ol
});

// Oyuncu 1 ismini gir
Given('Enter the first players name {string}', (name) => {
 
  // Oyuncu ismini gir ve formu gönder
  cy.get('input[name="answer"]')
    .type(name)
    .should('have.value', name)
    .type('{enter}');
  cy.wait(500); // Gönderim işleminin tamamlanması için bekle
});

// Oyuncu 2 ismini gir
And('Enter the second players name {string}', (name) => {
   cy.contains( 'Enter the name of player' ).should( 'be.visible' );
  cy.get( 'input[name="answer"]' )
    .type( name )
    .should( 'have.value', name )
    .type( '{enter}' );
  cy.wait( 200 );
});

// Oyun başladığında doğru şekilde başlayıp başlamadığını kontrol et
When('the game starts', () => {
  cy.get('.board').should('exist'); // Yeni bir board'ın olup olmadığını kontrol et
});

// Oyuncu 1'in oyunu kazandığını doğrula
Then('Player1 wins the game', () => {
cy.contains('Player 1 wins').should('be.visible'); // Kazanan mesajını doğrula
});

// "New game" butonunun görünmesini doğrula
And('I should see the "New game" button', () => {
  cy.contains('New game').should('be.visible'); // "New game" butonunun görünmesini doğrula
});


When( 'the game restarts', () => {
  cy.get( '.button' ).contains( 'New game' ).click();
  cy.wait( 1000 );
} );

// Yeni oyuncu isimleri ile oyunun başladığını kontrol et
Then('the game should start with player {string} as {string}', (playerName, color) => {
  const colorClass = color === 'red' ? 'red-circle' : 'yellow-circle';
  cy.contains(`${playerName}'s turn`).should('be.visible'); // Oyuncunun sırası olduğuna dair mesajı kontrol et
  cy.get(`.${colorClass}`).should('exist'); // Doğru renkli dairenin var olduğunu kontrol et
  cy.get('.board').should('exist'); // Yeni board'ı kontrol et
});

And('a new board is displayed', () => {
  cy.get('.board').should('exist'); // Yeni tahta öğesinin var olduğunu doğrula
  cy.get('.board').should('be.visible'); // Tahtanın görünür olduğunu doğrula
});

// Oyunun doğru oyuncunun sırası ile başladığını kontrol et
And('it should be {string}\'s turn with the red circle shown', (playerName) => {
  cy.contains(`${playerName}'s turn`).should('be.visible'); // Oyuncunun sırası olduğuna dair mesajı kontrol et
  cy.get('.red-circle').should('exist'); // Kırmızı dairenin var olduğunu kontrol et
});


