# 家属联络授权与代理人后端

这是一个面向寻人中心的 Node.js 后端起始工程，提供健康检查和领域样例读取接口，便于继续实现家属联络授权与代理人流程。

## 运行

需要 Node.js 20 或更高版本。

```bash
npm test
npm start
```

服务默认监听 `http://localhost:3000`，可通过 `PORT` 修改端口。执行 `docker compose up --build` 可在容器中启动。

## 已有接口

- `GET /health` 返回健康状态。
- `GET /api/context` 返回 `fixtures/context.json` 中的领域资料。

业务模块可在 `src` 下继续组织，测试统一放在 `test` 目录。
