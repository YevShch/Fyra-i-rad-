Feature: Draw scenario in Connect Four game

  Scenario: Declaring a draw between two players
    Given that there are two players in a connect four game, and one creates a game while the other joins it
    When both players play the game until it ends in a tie
    Then the game declares a draw on both players screens
