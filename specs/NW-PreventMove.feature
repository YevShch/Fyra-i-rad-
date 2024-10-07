  Feature: Prevent move out of turn
  
  Scenario: Prevent move out of turn 
    Given Player 1 and Player 2 have joined the game
    When Player 1 makes a move in column 3
    Then The move should appear on both player screens in column 3
    When Player 1 tries to make another move in column 6
    Then Player 1 should not be able to make the move in column 6
    When Player 2 makes a move in column 4
    Then The move should appear on both player screens in column 4
    When Player 2 tries to make another move in column 5
    Then Player 2 should not be able to make the move in column 5