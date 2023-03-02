const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');
const consola = require('consola');

const renderApp = require('./render.js');
const mime = require("mime-types");

const BUILD_PATH = '../dist';
const STATIC_PATH = '/client';
const host = String(process.env.HOST || 'localhost');
const port = Number(process.env.PORT || 8000);

const staticDir = path.resolve(__dirname, path.join(BUILD_PATH, STATIC_PATH));
const staticUrl = '/static';

const getMimeType = (fileName) => {
  const fileExt = path.extname(fileName);
  return mime.lookup(fileExt);
};

/**
 * Sends http status & it's textual message.
 * @param res - http server response object.
 * @param code - http status code as number.
 */
function sendHTTPStatus(res, code) {
  const msg = http.STATUS_CODES[code];
  res.writeHead(code);
  res.end(msg);
}

/**
 * Handle that serves index page.
 * @param req - http server request object.
 * @param res - http server response object.
 */
function handleIndexPage(req, res) {
  consola.info('rendering ' + req.url.pathname);
  const templ = renderApp();
  return res.end(templ);
}

/**
 * Handle that serves static files.
 * @param req - http server request object.
 * @param res - http server response object.
 * @param urlBase - url part to split with.
 */
function handleStaticFiles(req, res, urlBase = staticUrl) {
  try {
    const fileName = req.url.pathname.split(urlBase)[1];
    const fileMime = getMimeType(fileName);
    const filePath = path.join(staticDir, fileName);
    const exists = fs.existsSync(filePath);

    if (!exists) {
      res.setHeader('content-type', fileMime);
      return sendHTTPStatus(res, 404);
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        return sendHTTPStatus(res, 500);
      }

      res.setHeader('content-type', fileMime);
      res.end(data)
    })
  } catch (err) {
    consola.error('Failed to serve static file:', err);
    const code = err.code === 'ENOENT' ? 404 : 500;
    return sendHTTPStatus(res, code);
  }
}

/**
 * Routes incoming requests to thier handlers.
 * @param req - http server request object.
 * @param res - http server response object.
 */
function routeRequest(req, res) {
  try {
    // eslint-disable-next-line node/no-deprecated-api
    req.url = url.parse(req.url, true);
    if (req.url.pathname.startsWith(staticUrl)) {
      handleStaticFiles(req, res);
    } else {
      handleIndexPage(req, res);
    }
  } catch (err) {
    consola.error('Failed to route the request:', err);
    sendHTTPStatus(res, 500);
  }
}

/**
 * Runs http/1.1 server.
 */
function runServer() {
  const server = http.createServer(routeRequest);
  consola.success(`Listening at http://${host}:${port} 🦄`);
  server.listen(port, host);
}

module.exports = runServer;
