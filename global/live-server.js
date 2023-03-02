function getPort() {
  const elem = document.querySelector('#liveServer');
  return elem && elem.dataset.port;
}

function initConnection(port) {
  const socket = new WebSocket(`ws://localhost:${port}`);

  socket.onopen = function () {
    console.log('[open] Live Server enabled. Watching for changes.');
  };

  socket.onmessage = function () {
    socket.close();
    location.reload();
  };
}

const port = getPort();
port && initConnection(port);
