Feature: Connect 4 Game Mechanics

  Scenario: Place a tile in an empty column
    Given the game is loaded and the board is empty
    When the red player places a tile in the first column
    Then the tile is placed correctly and the board updates

  Scenario: Try to place a tile in a full column
    Given the game is loaded and the board is empty
    And the first column is full
    When the red player tries to place another tile in the full column
    Then the tile is not placed

  Scenario: Show tile preview on hover
    Given the game is loaded and the board is empty
    When the player hovers over the first column
    Then a preview of the tile position is shown
