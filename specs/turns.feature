
Feature: Network Play - Turn Management and Turn Message Display

  Scenario: Players take turns correctly, and the "turn" message is displayed properly on both screens
    Given that there are two players, and the first player can start the game
    When both players take their turns in the game
    Then the game can display "Gursel's turn" on Player Red's screen when it's Player Red's turn
    And the game can display "Esra's turn" on Player Yellow's screen when it's Player Yellow's turn
    Then the game can show the winner
   

  
