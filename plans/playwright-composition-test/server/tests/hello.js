import {
    Server
} from "../lib";

export default async (runenv, client) => {
    const serverPort = 3001;
    const serverAddress = '127.0.0.1';

    server = new Server();
    await server.listen(serverAddress, serverPort);

    const addr = `http://${serverAddress}:${serverPort}`;
    runenv.recordMessage('server is listening at: ' + addr);

    await client.signalEntry('server-ready');

    runenv.recordMessage('server waiting until test is ready');

    const b = await client.barrier('test-ready', 1);
    await b.wait;

    runenv.recordMessage('stopping server');
    await server.stop();
}