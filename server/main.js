import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';

const schema = buildSchema(`type Query { ip: String }`);

function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}

const root = {
  ip(args, context) {
    return context.ip;
  },
};

const app = express();
app.use(loggingMiddleware);
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    context: (req) => ({
      ip: req.raw.ip,
    }),
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

