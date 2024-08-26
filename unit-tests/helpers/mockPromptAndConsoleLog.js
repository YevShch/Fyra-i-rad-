import { vi, beforeEach, afterEach } from 'vitest';

// promptQuestions = an array of questions the program calls prompt with
// mockAnswers = an array of answers we want to give for the questions
// consoleOutput = an array of output the program calls console.log with
export const promptQuestions = [], consoleOutput = [];
let mockAnswers = [];

// Set mock answers for prompt
export function setMockAnswers(...answers) {
    mockAnswers = answers;
}

// Save the original console.log
const originalConsoleLog = console.log;

// Mock the prompt function
export function mockPrompt() {
    vi.mock('../../helpers/prompt.js', async () => {
        return {
            default: (question) => {
                promptQuestions.push(question);
                return mockAnswers.shift();
            }
        }
    });
}

// Mock console.log function
export function mockConsoleLog() {
    console.log = (...args) => consoleOutput.push(args);
}

// Restore the original console.log and prompt functions
export function restorePromptAndConsoleLog() {
    console.log = originalConsoleLog;
    vi.restoreAllMocks();
}

// Apply mocks before each test
beforeEach(() => {
    promptQuestions.length = 0;
    consoleOutput.length = 0;
    mockPrompt();
    mockConsoleLog();
});

// Restore original functions after each test
afterEach(() => {
    restorePromptAndConsoleLog();
});
