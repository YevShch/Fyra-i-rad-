Feature: Players take turns correctly in the game

  Scenario: Players take turns and the turn message is updated correctly
    Given the game has started
    When Player Red makes a move
    Then it should be Player Yellow's turn
    And the message should display "Yellow's turn"

    When Player Yellow makes a move
    Then it should be Player Red's turn
    And the message should display "Red's turn"
