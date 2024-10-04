Feature: Network Play - Rematch Feature

  Scenario: Players can choose to play again after the game ends
    Given that there are two players, and one creates a game while the other joins it
    When both players play the game until one of them wins
    Then the game declares the winner
    And the victory confetti animation is correctly displayed on both Player Red's and Player Yellow's screens
    And the winning combination blinks on both Player Red's and Player Yellow's screens
    Then the "NewPlay" button should be clickable on both Player Red's and Player Yellow's screens
    And when the "NewPlay" button is clicked on Player Red's screen, the game restarts for both players

