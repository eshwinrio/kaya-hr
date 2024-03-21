import { gql } from "../lib/gql-codegen";

export const ContactDetailsFragment = gql(/* GraphQL */`
  fragment ContactDetails on User {
    email
    phone
    streetName
    city
    province
    pincode
    country
  }
`);
