import {
    invokeMap
} from '@testground/sdk';

import testPong from './tests/pong';

const testcases = {
    pingpong: testPong,
}

(async () => {
    await invokeMap(testcases)
})();