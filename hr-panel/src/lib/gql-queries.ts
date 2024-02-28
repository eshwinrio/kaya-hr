import { gql } from "./gql-codegen/gql";

export const WHOAMI = gql(`
  query WhoAmI {
    currentUser {
      id
      firstName
      lastName
      email
      organization {
        name
      }
    }
  }
`);
