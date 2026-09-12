const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const contextPath = path.join(__dirname, '..', 'fixtures', 'context.json');

function readContext() {
  return JSON.parse(fs.readFileSync(contextPath, 'utf8'));
}

function sendJson(response, statusCode, body) {
  const payload = JSON.stringify(body);
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
  });
  response.end(payload);
}

function createServer() {
  return http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok' });
      return;
    }
    if (request.method === 'GET' && request.url === '/api/context') {
      sendJson(response, 200, readContext());
      return;
    }
    sendJson(response, 404, { code: 'NOT_FOUND', message: '接口不存在' });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  createServer().listen(port, '0.0.0.0', () => console.log(`服务已启动，端口 ${port}`));
}

module.exports = { createServer, readContext };
