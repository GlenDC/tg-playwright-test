import {
    invokeMap
} from '@testground/sdk';

import testPing from './tests/ping';

const testcases = {
    pingpong: testPing,
}

(async () => {
    await invokeMap(testcases)
})();