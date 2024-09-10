Feature: Game flow in different scenarios

  As a user
  I want the game to function correctly in various scenarios
  So that I can ensure the game handles both wins, ties, and player changes smoothly

  Scenario: Play multiple rounds with the same players, including a win and a draw
    Given the game has started
    And Player 1 enters their name as "Anna"
    And Player 2 enters their name as "Erik"
    When the game begins
    Then Player 1 and Player 2 play until Player 1 wins the first round
    And the system should declare Player 1 as the winner with name "Anna"
    When Player 1 and Player 2 start a new round
    And the round ends in a draw
    Then the system should display a message indicating the game is a draw

  Scenario: Play several rounds with new players after each game ends
    Given the game has started
    And Player 1 enters their name as "John"
    And Player 2 enters their name as "Mike"
    When the game begins
    Then Player 1 and Player 2 play until the game ends
    And the system should declare a winner or a draw with Player 1 name "John"
    When the game restarts
    And Player 1 enters their name as "Sarah"
    And Player 2 enters their name as "Tom"
    Then the system should allow Player 1 "Sarah" to start a new game

  Scenario: Play a couple of rounds with the same players and then switch to a new game with new players
    Given the game has started
    And Player 1 enters their name as "Alice"
    And Player 2 enters their name as "Bob"
    When the game begins
    Then Player 1 and Player 2 play two rounds
    And the system should declare Player 2 as the winner with name "Bob"
    When the game restarts
    And Player 1 enters their name as "Linda"
    And Player 2 enters their name as "David"
    Then the system should start a new game with Player 1 "Linda"

  Scenario: A player wins, and then the game restarts with different players
    Given the game has started
    And Player 1 enters their name as "Emily"
    And Player 2 enters their name as "Chris"
    When the game begins
    Then Player 1 wins the game
    And the system should declare Player 1 as the winner with name "Emily"
    When the game restarts
    And Player 1 enters their name as "George"
    And Player 2 enters their name as "Helen"
    Then the system should allow Player 1 "George" to start a new game
