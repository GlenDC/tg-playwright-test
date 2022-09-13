import { basicExpressTest } from './basicExpress.js';

(async () => {
    const runenv = {};
    runenv.testSidecar = true;
    runenv.recordMessage = function(msg) {
        console.log(msg);
    }
    const client = {};

    await basicExpressTest(runenv, client);
})();
