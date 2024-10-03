import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('the game has finished with a winner in network play', () => {
  // Oyunun network modunda başlatıldığından emin ol
  cy.visit('/index.html'); // Oyunu başlat
  
  // Ağa bağlan ve iki oyuncu arasındaki oyunu simüle et
  // "Create" seçeneğini tıklayıp oyunu başlatıyoruz
  cy.contains('Yes').click(); // Network play seçeneği
  cy.contains('Create').click(); // Oyun oluşturuluyor
  cy.get('input').type('Player1'); // Oyuncu adını giriyoruz
  cy.contains('OK').click();

  // İkinci oyuncu simülasyonu: Aynı kodla katılacak oyuncu üzerinden ilerleyebiliriz
  cy.window().then((win) => {
    // Aşağıda her iki oyuncunun tıklamaları ve hamleleri yer alıyor
    // Birkaç hamle yaparak oyunu sona erdiriyoruz
    cy.get('.column').eq(0).click(); // Kırmızı oyuncu hamlesi
    cy.get('.column').eq(1).click(); // Sarı oyuncu hamlesi
    cy.get('.column').eq(0).click(); // Kırmızı oyuncu hamlesi
    cy.get('.column').eq(1).click(); // Sarı oyuncu hamlesi
    cy.get('.column').eq(0).click(); // Kırmızı oyuncu hamlesi
    cy.get('.column').eq(1).click(); // Sarı oyuncu hamlesi
    cy.get('.column').eq(0).click(); // Kırmızı oyuncu hamlesi, oyunu kazanır
  });
});

Then('a Replay button should be visible for the player who started the game', () => {
  // Replay butonunun görünür olduğunu doğrula
  cy.get('.button').contains('Replay').should('be.visible');
});

When('the player clicks on the Replay button', () => {
  // Replay butonuna tıklıyoruz
  cy.get('.button').contains('Replay').click();
});

Then('the game should restart in network mode', () => {
  // Oyun yeniden başlatılmalı
  cy.get('.player-name').should('contain', "Player1's turn");
});

Then('the board should be empty', () => {
  // Tahtanın boş olduğundan emin oluyoruz
  cy.get('.column').each(($column) => {
    cy.wrap($column).find('.slot').should('not.have.class', 'red').and('not.have.class', 'yellow');
  });
});
