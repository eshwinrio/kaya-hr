import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../hr-resource/graphql/schema.graphql',
  documents: [
    'src/components/**/*.{ts,tsx}',
    'src/graphql/**/*.ts',
    'src/pages/**/*.{ts,tsx}',
    'src/shared/**/*.{ts,tsx}',
  ],
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
