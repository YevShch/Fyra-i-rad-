Feature: Fyra i Rad Multiplayer over Network
   As two players
  They should be able to create or join a game, take turns, and start playing.

  Scenario: Two players start a game over the network
     Given that we are two players and one creates a game and one joins it
     Then we should both see that its the first players turn
 
