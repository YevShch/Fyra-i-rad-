import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('that Player1 chooses to create a new game', () => {
  // Oyuncu 1 yeni bir oyun oluşturmak için "Create" butonuna tıklar
  cy.visit('/index.html'); // Ana sayfa ziyaret ediliyor
  cy.get('#start-game').click(); // Oyun başlat butonuna tıklanıyor
  cy.get('.button').contains('Yes').click(); // Ağ üzerinden oynamak için "Yes" seçiliyor
  cy.get('.button').contains('Create').click(); // Yeni bir oyun oluşturuluyor
});

When('Player1 sends the join code to Player2', () => {
  // Oyuncu 1, Player 2'ye katılma kodunu gönderir (kod ekranda gösterilir)
  cy.get('input[name="joinCode"]').invoke('val').as('joinCode'); // Kod alınır ve kaydedilir
});

Given('Player2 chooses to join the game', () => {
  // Oyuncu 2, katılma seçeneğini kullanarak oyuna katılır
  cy.visit('/'); // Oyuncu 2'nin sayfası
  cy.get('#start-game').click(); // Oyun başlat butonuna tıklanıyor
  cy.get('.button').contains('Yes').click(); // Ağ üzerinden oynamak için "Yes" seçiliyor
  cy.get('.button').contains('Join').click(); // Oyuncu 2 oyuna katılıyor
});

When('Player2 enters the join code and joins the game', function () {
  // Player 2, Player 1'den aldığı kodu girerek oyuna katılır
  cy.get('input[name="joinCode"]').type(this.joinCode); // Kaydedilen kodu giriyor
  cy.get('.button').contains('OK').click(); // Onaylayıp katılıyor
});

Then('both players should be registered in the game', () => {
  // Her iki oyuncunun da oyuna kaydolduğu doğrulanıyor
  cy.get('#player1-status').should('contain', 'Player1 is ready');
  cy.get('#player2-status').should('contain', 'Player2 is ready');
});

Then('Player1 should take the first turn', () => {
  // Oyunun başladığını ve ilk turda Player 1'in olduğunu doğrular
  cy.get('#turn-indicator').should('contain', "Player1's turn");
});
