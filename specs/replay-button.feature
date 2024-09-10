Feature: Replay Button Behavior

  Scenario: Show dialog with message about whose turn it is
    Given the game is running
    When the player clicks the "Replay" button
    Then a dialog should show whose turn it is
    And the player should click "OK" to start the game

  Scenario: Clear previous game data and restart the game
    Given the game is running
    When the player clicks the "Replay" button
    Then previous game data should be cleared
    And the game should restart

  Scenario: The player who started last game should not start this game
    Given the game is running and the last game was started by the red player
    When the player clicks the "Replay" button
    Then the yellow player should start this game
