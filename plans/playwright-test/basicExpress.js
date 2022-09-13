import { Server } from './server.js';
import { runPlaywrightTest } from './playwright.js';

export async function basicExpressTest (runenv, client) {
  if (!runenv.testSidecar) {
    throw new Error('this test requires a sidecar.')
  }

  let server;

  try {
    const serverPort = 3001;
    const serverAddress = '127.0.0.1';

    server = new Server();
    await server.listen(serverAddress, serverPort);

    const addr = `http://${serverAddress}:${serverPort}`;
    runenv.recordMessage('server is listening at: ' + addr);

    runenv.recordMessage('before runPlaywrightTest')
    await runPlaywrightTest(runenv, client, addr)
  } finally {
    if (server) {
        server.close()
    }
  }
}
