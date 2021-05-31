import { GraphQLClient } from "graphql-request";

export interface GraphQLRequest {
  query: string;
  variables: Object;
  preview?: string;
}

export function request({ query, variables, preview }: GraphQLRequest) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer 453a5c7ab31e51ae0792cff26fe5a6`,
    },
  });
  return client.request(query, variables);
}
