Feature: Fyra i Rad Multiplayer over Network
   As two players
  They should be able to create or join a game, take turns, and start playing.

  Scenario: Two players start a game over the network
    Given that Player1 chooses to create a new game
    And Player2 chooses to join the game
    When Player1 sends the join code to Player2
    And Player2 enters the join code and joins the game
    Then both players should be registered in the game
    And Player1 should take the first turn
