import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ip: {
        type: GraphQLString,
        resolve: (_, args, context) => {
          return context.ip;
        }
      }
    },
  }),
});

function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}

const app = express();
app.use(loggingMiddleware);
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    context: (req) => ({
      ip: req.raw.ip,
    }),
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
