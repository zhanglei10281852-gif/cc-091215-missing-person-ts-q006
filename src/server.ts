import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';

const contextPath = path.join(__dirname, '..', 'fixtures', 'context.json');

export function readContext(): unknown {
  return JSON.parse(fs.readFileSync(contextPath, 'utf8'));
}

function sendJson(response: http.ServerResponse, statusCode: number, body: unknown): void {
  const payload = JSON.stringify(body);
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
  });
  response.end(payload);
}

export function createServer(): http.Server {
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
