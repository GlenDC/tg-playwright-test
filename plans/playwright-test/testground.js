import { invokeMap } from '@testground/sdk';
import { basicExpressTest } from './basicExpress.js';

const testCases = {
  basicExpress: basicExpressTest,
};

(async () => {
  // This is the plan entry point.
  await invokeMap(testCases)
})();
