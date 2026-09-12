const assert = require('node:assert/strict');
const http = require('node:http');
const test = require('node:test');
const { createServer, readContext } = require('../src/server');

test('领域资料可以读取', () => {
  const context = readContext();
  assert.equal(typeof context.project, 'string');
  assert.ok(Array.isArray(context.records));
  assert.ok(context.records.length > 0);
});

test('健康检查返回正常状态', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const { port } = server.address();
  const body = await new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port, path: '/health' }, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, data }));
    }).on('error', reject);
  });
  assert.equal(body.status, 200);
  assert.deepEqual(JSON.parse(body.data), { status: 'ok' });
});
