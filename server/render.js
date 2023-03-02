const fs = require('fs');
const path = require('path');

const tmplPath = path.resolve(__dirname, 'template.html');
const tmplHtml = fs.readFileSync(tmplPath).toString();

const placeholderHtml = '{{ html }}';
const placeholderState = '{{ state }}';
const placeholderLiveServer = '{{ liveServer }}';

const bundlePath = '../dist/server/bundle';

function getLiveServerInjection() {
  const liveServerHTML =
           `<script id="liveServer" type="text/javascript" src="/static/live-server.js" data-port="${process.env.LIVE_SERVER_PORT || 8080}"></script>`;

  return process.env.ROLLUP_WATCH ? liveServerHTML : '';
}

function render(state = {}) {
  const { App } = require(bundlePath);
  const stateJson = JSON.stringify(state);
  const stateElem = `<script>window.__STATE__=${stateJson}</script>`;
  const htmlContent = App.render(state).html;
  return tmplHtml
    .replace(placeholderHtml, htmlContent)
    .replace(placeholderState, stateElem)
    .replace(placeholderLiveServer, getLiveServerInjection);
}

module.exports = render;
