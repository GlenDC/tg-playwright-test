import {
    invokeMap
} from '@testground/sdk';

import testServer from './tests/server';

const testcases = {
    server: testServer,
}

(async () => {
    await invokeMap(testcases)
})();