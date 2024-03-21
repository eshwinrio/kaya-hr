import { gql } from "../lib/gql-codegen";

export const UserOrganizationFragment = gql(/* GraphQL */`
  fragment UserOrganization on User {
    organization {
      id
      name
      summary
      webUrl
      logoUrl
      bannerUrl
    }
  }
`);
