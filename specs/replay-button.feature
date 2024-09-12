Feature: Replay Button Behavior

  Scenario: Start the game by entering player names
    Given the game is loaded
    When the player enters "Eva" as the red player
    And the player enters "Alex" as the yellow player

  Scenario: Replay the game after someone wins or the game is a draw
    Given the game is in progress
    When the player clicks the "Replay" button after the game ends
    Then a dialog should show whose turn it is to start the new game
    And the player should click "OK" to start the new game
    And the game board should be reset

  Scenario: Alternate starting player on replay
    Given the game was started by the red player
    When the player clicks the "Replay" button
    Then the yellow player should start the next game
