 # 🔴🟡 Connect Four Game 🎮
### Project Overview
This project is a classic Connect Four game developed as part of a group school project. Both development and testing students participated in the project to build and test the functionality of the game.

### Project Participants:
1. Anam  **[DevAnamTales](https://github.com/DevAnamTales)**
2. Esra   **[esraunal07](https://github.com/esraunal07)**
3. Gursell  **[gursell](https://github.com/gursell)**
4. Neby **[Nebshi](https://github.com/Nebshi)**
5. Yevheniia **[YevShch](https://github.com/YevShch)**

This repository contains the main branch of the project, which reflects the final version of the game developed during Sprint 4.

### Game Description
Connect Four is a strategic two-player board game, where the goal is to connect four of your pieces in a row either horizontally, vertically, or diagonally on the game board.

#### Key Features:
The game supports two players (red and yellow).
Players take turns dropping their pieces into columns.
The game ends when one player connects four pieces in a row or when the board is full (resulting in a draw).
The interface allows players to start a new game or continue with the current players.

### Versions and Sprints
Main Branch (Current Version)
The main branch contains the latest version of the game developed during Sprint 4, which includes all the final features and improvements. The game has been tested and is ready for use. This version includes key game mechanics, bug fixes, and a refined interface.

### Sprint Branches:
Each previous version of the game is stored in a separate branch, corresponding to the sprint in which it was developed. These branches contain intermediate versions showcasing various steps in development and bug fixes:

**[Sprint 1](https://github.com/YevShch/Fyra-i-rad-/tree/dev-SPRINT1):** Develop the core game logic (for two human players) without a graphical interface, ensuring it follows test-driven development (TDD) principles with object-oriented JavaScript and Vitest/Jest for testing.

**[Sprint 2](https://github.com/YevShch/Fyra-i-rad-/tree/dev-GUI-Sprint-2):** Build a graphical user interface (GUI) for the game and ensure it is thoroughly tested.

**[Sprint 3](https://github.com/YevShch/Fyra-i-rad-/tree/dev-AI-Sprint3):** Create a rules-based AI and test it.

**[Sprint 4](https://github.com/YevShch/Fyra-i-rad-/tree/dev-Network-Sprint4):** Develop network functionality to allow players to compete over the internet, and test this feature.

Each sprint included both manual testing and automated tests to ensure code stability and high quality.

### Running the Project

1. Install dependencies:
```bash
npm install
```
2. Run the local server:
```bash
npm start
```
The game will be available at: http://localhost:5173

3. Run tests:
**Vitest tests:**
```bash
npm test
```
**Cypress tests:**
```bash
npm run test-cypress
```
**or web version:**
```bash
npm run test-cypress-ui
```

### Conclusion
The project was successfully completed as part of the school curriculum. All participants contributed to the development and testing, which resulted in a high-quality game version. Further improvements and feature expansions may be implemented based on feedback and analysis.
