const express = require("express");

export class Server {
    constructor() {
        this.app = express();
        this.app.get("/", (request, response) => {
            const html = `
                    <html>
                    <body>
                    <div id="greeting">Hello world</div>
                    </body>
                    </html>
                    `;
            response.send(html);
        });
    }

    listen(host, port) {
        this.server = this.app.listen(port, host);
    }

    close() {
        this.server.close();
    }
}
