Feature: Check for win conditions in Connect Four

  Background: Start the game by entering player names
    Given the game is loaded
    And the player enters "Anna" as the red player
    And the player enters "Beata" as the yellow player

  Scenario: Simulate a win with a vertical moves
    When the following moves are made:
      | player | column |
      | red    | 0      |
      | yellow | 1      |
      | red    | 0      |
      | yellow | 1      |
      | red    | 0      |
      | yellow | 1      |
      | red    | 0      |
    Then the system should declare "Anna" as the winner
    And the "Replay" button should be visible
    
  Scenario: Simulate a win with a horizontal moves
    When the following moves are made:
      | player | column |
      | red    | 0      |
      | yellow | 5      |
      | red    | 1      |
      | yellow | 6      |
      | red    | 2      |
      | yellow | 7      |
      | red    | 3      |
    Then the system should declare "Anna" as the winner
    And the "Replay" button should be visible
  
  Scenario: Simulate a win with a diagonal moves
    When the following moves are made:
      | player | column |
      | red    | 0      |
      | yellow | 1      |
      | red    | 1      |
      | yellow | 2      |
      | red    | 2      |
      | yellow | 3      |
      | red    | 2      |
      | yellow | 3      |
      | red    | 3      |
      | yellow | 5      |
      | red    | 3      |

    Then the system should declare "Anna" as the winner
    And the "Replay" button should be visible