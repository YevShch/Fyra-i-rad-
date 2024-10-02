Feature: Victory animation in networked game

  Scenario: Display of victory animation when a player wins in a networked game
    Given that there are two players, and one creates a game while the other joins it
    When both players play the game until one of them wins
    Then the victory confetti animation is correctly displayed on both Player Red's and Player Yellow's screens
    And the game declares the winner
    And the winning combination blinks on both Player Red's and Player Yellow's screens
