Feature:  Red player wins the game

  Scenario: Red wins vertically in a Connect Four game
    Given that there are two players in a game, and one creates a game while the other joins it
    When both players play the game until Red wins vertically
    Then the game declares Red player "Anna" as the winner on both screens