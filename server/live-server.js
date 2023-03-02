const chokidar = require('chokidar');
const consola = require('consola');
const path = require('path');
const { WebSocketServer } = require('ws');

const chokidarOptions = { ignoreInitial: true, awaitWriteFinish: true };
const folder = path.resolve(__dirname, '../dist/');

module.exports = class LiveServer {
    timer = null;
    server = null;
    ws = null;
    throttle;

    constructor(port = 8080, throttle = 200) {
      this.throttle = throttle;
      this.initServer(port);
      this.watchFiles();
    }

    initServer(port) {
      this.server = new WebSocketServer({ port });
      consola.success(`Live server has started on port ${port}`);
      this.server.on('connection', (ws) => {
        this.ws = ws;
      });
    }

    watchFiles() {
      chokidar
        .watch(folder, chokidarOptions)
        .on('all', (event, folderPath) => {
          this.sendMessage(event, folderPath);
        });
    }

    sendMessage(event, folderPath) {
      if (this.timer || !this.ws) return;

      this.timer = setTimeout(() => {
        this.ws.send(`${event} ${folderPath}`);
        clearTimeout(this.timer);
        this.timer = null;
      }, this.throttle);
    }
};
