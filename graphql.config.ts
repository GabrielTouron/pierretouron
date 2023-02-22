import type { IGraphQLConfig, SchemaPointer } from 'graphql-config';

const datoCmsPath = 'https://graphql.datocms.com';
const datoCmsPreviewPath = 'https://graphql.datocms.com/preview';

const schemaPreview: SchemaPointer = [
  {
    [`${datoCmsPreviewPath}`]: {
      headers: {
        Authorization: process.env.NEXT_DATOCMS_API_TOKEN || '',
        "X-Exclude-Invalid": "true",
        "X-Included-Drafts": "true",
        "X-Environment": "main",
      },
    },
  },
];

const schema: SchemaPointer = [
  {
    [`${datoCmsPath}`]: {
      headers: {
        Authorization: process.env.NEXT_DATOCMS_API_TOKEN || '',
        "X-Exclude-Invalid": "true",
        "X-Included-Drafts": "false",
        "X-Environment": "main",
      },
    },
  },
];

const config: IGraphQLConfig = {
  schema: process.env.NODE_ENV === 'development' ? schemaPreview : schema,
  documents: './graphql/**/*.graphql',
  extensions: {
    codegen: {
      overwrite: true,
      generates: {
        'graphql/generated.ts': {
          config: {
            strictScalars: true,
            scalars: {
              BooleanType: 'boolean',
              CustomData: 'Record<string, unknown>',
              Date: 'string',
              DateTime: 'string',
              FloatType: 'number',
              IntType: 'number',
              ItemId: 'string',
              jsonField: 'unkown',
              MetaTagAttributes: 'Record<string, string>',
              UploadId: 'string',
            },
          },
          plugins: [
            'typescript',
            'typescript-operations',
            'typed-document-node',
          ],
        }
      },
    },
  },
};

export default config;
