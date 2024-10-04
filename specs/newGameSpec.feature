Feature: Network Play - Rematch Feature

  Scenario: Players can choose to play again after the game ends
    Given that there are two players, and the first player should start the game
    When both players play the game until one of them wins
    Then the game should show the winner
    And the winning combination blinks on both Player Red's and Player Yellow's screens
    Then the "New Game" button should be clickable on the Player Red's screen
    And when the "New Game" button is clicked on Player Red's screen
    And Ensure the red player can create a new game



