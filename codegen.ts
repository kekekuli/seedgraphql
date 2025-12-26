import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "graphql/schema.graphql",
  generates: {
    "server/src/types/schema.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers"
      ],
      config: {
        useIndexSignature: true
      }
    },
    "client/src/gql/": {
      documents: "graphql/documents/**/*.graphql",
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      }
    }
  }
}

export default config
