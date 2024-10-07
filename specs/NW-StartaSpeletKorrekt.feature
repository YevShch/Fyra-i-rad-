Feature: Fyra i Rad Multiplayer over Network
   As two players
  They should be able to create or join a game, take turns, and start playing.

  Scenario: Two players start a game over the network
    When One of the two players starts the game, the other joins the game
    Then The game is played until one of the players wins.
 
