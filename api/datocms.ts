import { request as graphqlRequest, Variables } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export interface GraphQLRequest {
  query: string;
  variables?: unknown;
  preview?: string;
}

const datoCMSEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://graphql.datocms.com/"
    : "https://graphql.datocms.com/preview";

export const request = async <TDocument>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  variables?: Variables,
): Promise<TDocument> => {
  return graphqlRequest<TDocument, Variables>(datoCMSEndpoint, document, variables, {
    Authorization: `${process.env.NEXT_DATOCMS_API_TOKEN}`,
    "X-Exclude-Invalid": "true",
    "X-Included-Drafts": process.env.NODE_ENV === "production" ? "false" : "true",
    "X-Environment": "main",
  });
};
