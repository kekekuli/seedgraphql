import express from 'express';
import { readFileSync } from 'node:fs';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';

import { Resolvers } from './src/types/schema.js';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const schemaPath = require.resolve('@seedgraphql/sdl/schema.graphql');
const schema = buildSchema(readFileSync(schemaPath, 'utf-8'));

const resolvers: Resolvers = {
  Query: {
    ip: (_, context) => {
      return context.ip
    },
    userAgent: (_, context) => {
      return context.ua
    }
  }
}

const app = express();

app.use(express.json())

app.use((req, _res, next) => {
  console.log("ip", req.ip);
  next();
})



app.all('/graphql', createHandler({
  schema: schema,
  rootValue: resolvers.Query,
  context: (req) => {
    return {
      ip: (req.raw as any).ip || '127.0.0.1',
      ua: (req.raw as any).headers['user-agent'] || 'unknow',
    }
  }
}))

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ GraphQL Server 启动成功！`);
  console.log(`🚀 地址: http://localhost:${PORT}/graphql`);
});
