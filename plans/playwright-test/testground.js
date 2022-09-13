const { invokeMap } = require('@testground/sdk')

const testCases = {
  basicExpress: require('./basic-express'),
};

(async () => {
  // This is the plan entry point.
  await invokeMap(testCases)
})();
