import sleep from './sleep.js';

const checkIntervalMs = 50;

export default async function waitUntil ( testFunction, timeout = 3000 ) {
  let maxTimesToRun = timeout / checkIntervalMs;
  let counter = 0;
  while ( counter < maxTimesToRun && !testFunction() ) {
    await sleep( checkIntervalMs );
    counter++;
  }
  return testFunction();
}
