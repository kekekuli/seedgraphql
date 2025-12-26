# Seed-GraphQL 🚀

这是一个用 `pnpm monorepo` + `GraphQL` + `Codegen` 的示例，旨在探索在 **Schema-first** 哲学下能带来的极致 **Type-safe**（类型安全）。

## 🛠️ 准备工作

- **Node**: >= 22
- **pnpm**: 最新版

## 🚀 快速开始

### 1. 安装依赖
```bash
pnpm install
```

### 2. 生成type代码

```bash
pnpm run codegen

```

### 3. 启动graphql server

```bash
pnpm --filter server start

```

### 3. 使用client发送一次请求

```
pnpm --filter client start
```
