import { GraphQLClient } from 'graphql-request'

export interface GraphQLRequest {
  query: string
  variables?: unknown
  preview?: string
}

/*eslint-disable */
export const request = async ({
  query,
  variables,
  preview,
}: GraphQLRequest) => {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  })
  return await client.request(query, variables)
}
/*eslint-enable */
