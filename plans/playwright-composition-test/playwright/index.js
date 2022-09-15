import {
    invokeMap
} from '@testground/sdk';

import testHello from './tests/hello';

const testcases = {
    hello: testHello,
}

(async () => {
    await invokeMap(testcases)
})();