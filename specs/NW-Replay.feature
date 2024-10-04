Feature: Replay the game in network mode

  Scenario: Players can choose to replay the game after it ends in network play
    Given the game has finished with a winner in network play
    Then a Replay button should be visible for the player who started the game
    When the player clicks on the Replay button
    Then the game should restart in network mode
    And the board should be empty
