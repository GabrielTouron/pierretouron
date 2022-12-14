import { GraphQLClient } from "graphql-request";
import { request as graphqlRequest, Variables } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export interface GraphQLRequest {
  query: string;
  variables?: unknown;
  preview?: string;
}

export const request2 = async <TDocument>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  variables?: Variables,
): Promise<TDocument> => {
  return graphqlRequest<TDocument, Variables>("https://graphql.datocms.com/", document, variables, {
    Authorization: `${process.env.NEXT_DATOCMS_API_TOKEN}`,
    "X-Exclude-Invalid": "true",
  });
};

export const request = async ({ query, variables, preview }: GraphQLRequest) => {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return await client.request(query, variables);
};
