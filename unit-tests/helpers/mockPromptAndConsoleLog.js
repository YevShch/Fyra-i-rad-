import { vi, beforeEach } from 'vitest';

// promptQuestions = an array of questions the program calls prompt with
// mockAnswers = an array of answers we want to give for the questions
// consoleOutput = an array of output the program calls console.log with
export const promptQuestions = [], consoleOutput = [];
let mockAnswers = [];

export function setMockAnswers ( ...answers ) {
  mockAnswers = answers;
};

// since we are going to mock console.log - save the original console.log
// so we can still use it by calling log
export const log = console.log;

// beforeEach -> do this before each test
beforeEach( () => {
  // empty the array promptQuestions;
  promptQuestions.length = 0;
  // mock the prompt!
  // vi.mock replaces parts of an import
  // and if the export is  done using 'export default'
  // then the part we want to replace is 'default'
  vi.mock( import( '../../helpers/prompt.js' ), async () => {
    return {
      default: ( question ) => {
        // remember the question the program sends to prompt
        promptQuestions.push( question );
        // return a mock answers to the program
        return mockAnswers.shift();
      }
    }
  } );
  // empty the array consoleOutput
  consoleOutput.length = 0;
  // mock console.log - not using vi.mock since
  // console.log is a global built in function
  console.log = ( ...args ) => consoleOutput.push( args );
} );