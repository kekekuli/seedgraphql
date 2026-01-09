import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "graphql/modules/**/*.graphql",
  documents: "graphql/queries/*.graphql",
  generates: {
    "graphql/modules/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../schema-types/schema.ts",
        filename: "module-types.ts",
      },
      plugins: [
        {
          add: {
            content: '/* eslint-disable */'
          }
        },
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        contextType: "../../server/src/context#Context"
      }
    },
    "client/src/generated-types/": {
      preset: "client",
    }
  },
}

export default config
