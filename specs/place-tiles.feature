Feature: Placing tiles on the game board

  Scenario: Place a tile in an empty column
    Given the board is empty
    When the player places a tile in a column
    Then the tile is placed correctly
    And the board updates

  Scenario: Prevent placing a tile in a full column
    Given one column is full
    When the player tries to place a tile in the full column
    Then the tile is not placed
    And an error is shown

  Scenario: Show preview before placing a tile
    Given the player hovers over a column
    Then a preview of the tiles position is shown
