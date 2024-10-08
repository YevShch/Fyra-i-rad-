## School Assignment: Four in a Row - Sprint 3
### EPIC for this Sprint
Develop an AI player for the Four-in-a-Row game, building on the functionality from previous sprints. Implement and test the AI logic with multiple difficulty levels.

### User Stories
1. As a user, I want to ensure that the user stories from sprint 1 and sprint 2 have been completed, so that I know the program logic and graphical interface are thoroughly tested.

2. As a user, I want to be able to play against two types of AI:
      - A basic AI that allows me to feel confident about winning the game.
      - A challenging AI that tests my skills and provides a tough opponent.
3. As a system owner, I want comprehensive testing of the two AI types, including automated testing and performance comparisons against other available AI to assess their difficulty levels.

4. New requirement: When selecting players, each player should be configurable as either a ‘human,’ a ‘basic AI’ (dumb bot), or a ‘smart AI’ (smart bot). This means that combinations such as a bot versus bot, human versus bot, or basic AI versus smart AI should all be possible.

### EPICS in Previous Sprints:
**[Sprint 1](https://github.com/YevShch/Fyra-i-rad-/tree/dev-SPRINT1):** Develop the core game logic (for two human players) without a graphical interface, ensuring it follows test-driven development (TDD) principles with object-oriented JavaScript and Vitest/Jest for testing.

**[Sprint 2](https://github.com/YevShch/Fyra-i-rad-/tree/dev-GUI-Sprint-2):** Build a graphical user interface (GUI) for the game and ensure it is thoroughly tested.


### Upcoming Sprint:
**[Sprint 4](https://github.com/YevShch/Fyra-i-rad-/tree/dev-Network-Sprint4):** Implement network functionality to allow players to compete over the internet, and test this feature.

### Sprint 3: Developing and Testing AI for Four-in-a-Row
In this sprint, we focused on adding functionality to allow different types of players—human, smart AI, and dumb AI—to compete against each other. Our goal was to implement and test a rules-based AI system with two difficulty levels and ensure that the game could support various combinations of player types.

#### AI Types Developed:
**Dumb Bot (Basic):** This AI makes random moves from available columns without considering the opponent's strategy. It does not attempt to block potential winning moves from the opponent and is designed to be an easy opponent for players to defeat.

**Smart Bot (Advanced):** This AI uses a more sophisticated decision-making process, based on evaluating the state of the game board after a potential move in each column. It assigns scores to moves by prioritizing certain outcomes, such as:

- Completing a line of four or blocking the opponent's line.
- Setting up three-in-a-row or planning for future moves.
The Smart AI evaluates one move ahead and selects the highest-scoring option based on this prioritization system.

#### Testing Focus:
The primary focus of testing in this sprint was to evaluate the intelligence of the two AIs: Dumb Bot and Smart Bot. Our testing aimed to ensure that:

- The Dumb AI consistently loses to the Smart AI due to its random and non-strategic gameplay.
- The performance of both AIs, particularly the Smart Bot, was compared against an External AI to measure their relative skill levels.

#### Testing Against an External AI:
To further test the strength of our AIs, we decided to compare them against an external AI bot available on the website **[LudoLab's Connect Four](https://ludolab.net/play/four-in-a-line/computer).** This AI has 10 difficulty levels, making it an ideal benchmark for our bot comparisons.

To facilitate this testing, we added a new player type called External AI to our game, exclusively for testing purposes. This allowed us to simulate matches between our bots and the external AI, with a custom function that fetches moves from the external AI on the LudoLab website and makes them in our game. 

#### Manual Testing Version Against External AI:
We developed a special version of the game with a graphical user interface (GUI) for manual testing against the external AI. This version was created to facilitate easier manual testing and assist us in evaluating the performance of our bots.  it served primarily as a tool to analyze winning strategies and assess our Smart Bot’s strength against the external AI, enabling us to identify areas for improvement and enhance its competitiveness against higher levels of the external AI.

You can find **[the manual testing version of the game here](https://github.com/YevShch/Fyra-i-rad-/tree/AI-testing-Yevheniia/).**

#### Automated Testing with Vitest:
To ensure that our AI logic functions as expected, we wrote automated tests using Vitest. These tests focus on validating that the Dumb Bot loses to the Smart Bot consistently and that the AIs behave according to their expected strategies and to compare our bots against the external AI to assess their performance levels accurately.

You can find our Vitest **[tests here](https://github.com/YevShch/Fyra-i-rad-/tree/dev-AI-Sprint3/tests).**

#### How to Run the Tests:
1. Install Vitest (if not already installed): Run the following command in your terminal:

```bash
npm install vitest --save-dev
``` 

2. Run the Tests: To execute all tests, use the command:

```bash
npm run test
```
3. Run a Specific Test File: To run a specific test file, use the following command, replacing filename with the actual name of the file:

```bash
npm run test tests/filename
```
This approach allowed us to thoroughly test our AI’s performance and compare it to an external AI benchmark, helping us refine and improve the intelligence of our Smart AI.

