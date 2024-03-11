import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../hr-resource/graphql/schema.graphql',
  documents: 'src/lib/gql-queries.ts',
  generates: {
    './src/lib/gql-codegen/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
  verbose: true,
};

export default config;
