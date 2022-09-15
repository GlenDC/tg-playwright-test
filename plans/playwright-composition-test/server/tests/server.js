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

    // TODO: trigger message to indicate server is ready

    // TODO: wait for all tests to be finished :)

    runenv.recordMessage('stopping server');
    await server.stop();
}