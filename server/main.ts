import { loadFilesSync } from '@graphql-tools/load-files'
import { serve } from '@hono/node-server'
import { createYoga } from 'graphql-yoga'
import { getConnInfo } from '@hono/node-server/conninfo';
import { Context } from './src/context';
import path from 'node:path';
import { Hono } from 'hono';
import Resolvers from './src/resolvers'
import { readdirSync, statSync } from 'node:fs';
import { createApplication, createModule } from 'graphql-modules';
import { useGraphQLModules } from '@envelop/graphql-modules';
import { fileURLToPath } from 'node:url';

const sdlModuleRoot = path.join(path.dirname(
  fileURLToPath(import.meta.resolve('@seedgraphql/sdl/package.json'))),
  'modules');

const moduleDirs = readdirSync(sdlModuleRoot).filter(f =>
  statSync(path.join(sdlModuleRoot, f)).isDirectory()
)

const modules = moduleDirs
  .filter((dirname) => {
    const result = !!Resolvers[dirname];
    if (!result) {
      console.warn(`No resolver found for ${dirname}, will not load that module`);
    }
    return result
  })
  .map((dirname) => {
    const resolverImpl = Resolvers[dirname];

    return createModule({
      id: `module-${dirname}`,
      typeDefs: loadFilesSync(path.join(sdlModuleRoot, dirname, '*.graphql')),
      resolvers: resolverImpl
    })
  })

const gqlApp = createApplication({ modules })

const yoga = createYoga<Context>({
  plugins: [useGraphQLModules(gqlApp)],
  context: (initialContext) => {
    return {
      req: initialContext.req
    }
  }
})


const app = new Hono();

app.all('/graphql', async (c) => {
  const connInfo = getConnInfo(c);
  return yoga.handle(c.req.raw, {
    req: Object.assign(c.req, {
      remoteAddr: connInfo.remote.address
    })
  })
});

const port = 4000;

serve({
  fetch: app.fetch,
  port
}, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
})
