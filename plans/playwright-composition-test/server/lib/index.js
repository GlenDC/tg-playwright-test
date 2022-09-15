import express from "express";

export class Server {
    constructor() {
        this.app = express();
        this.app.get("/", (request, response) => {
            const html = `
                    <html>
                    <head>
                    <title>Playwright Tester</title>
                    </head>
                    <body>
                    <div id="greeting">Hello world</div>
                    </body>
                    </html>
                    `;
            response.send(html);
        });
    }

    async listen(host, port) {
        const server = this.app.listen(port, host);
        this.server = server;
        return new Promise((resolve, reject) => {
            server
                .once('listening', resolve)
                .once('error', reject);
        });
    }

    close() {
        this.server.close();
    }
}

export default Server;
