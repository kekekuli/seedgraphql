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
      ]
    },
    "graphql/client-types/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: true
      }
    }
  }
}

export default config
