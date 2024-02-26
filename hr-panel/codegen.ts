import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: process.env['REACT_APP_RESOURCE_API_DOMAIN']! + process.env['REACT_APP_RESOURCE_API_GRAPHQL_ENDPOINT'],
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
