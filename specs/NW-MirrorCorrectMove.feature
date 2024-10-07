Feature: Mirror moves on two screens

  Scenario: Moves are correctly mirrored between two screens
    Given Player 1 and Player 2 have joined the game
    When Player 1 makes a move in column 3
    Then The move should appear on both player screens in column 3
    When Player 2 makes a move in column 4
    Then The move should appear on both player screens in column 4