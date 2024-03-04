import { gql } from "./gql-codegen/gql";

export const WHOAMI = gql(`
  query WhoAmI {
    currentUser {
      id
      firstName
      lastName
      email
      organization {
        id
        name
        summary
        webUrl
        logoUrl
        bannerUrl
      }
    }
  }
`);

export const LOAD_ROLES = gql(`
  query LoadAllRoles {
    roles {
      id
      code
      title
      description
      hourlyWage
    }
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input)
  }
`);

export const UPDATE_ORGANIZATION = gql(`
  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {
    updateOrganization(id: $id, input: $input)
  }
`);

export const LOAD_USERS = gql(`
  query LoadAllUsers {
    users {
        id
        firstName
        lastName
        email
        phone
        dateJoined
        dateOfBirth
        streetName
        pincode
    }
  }
`);

export const SYNC_USERS = gql(`
  mutation SyncUsers($force: Boolean) {
    syncUsers(force: $force) {
      accepted
      rejected
    }
  }
`);

export const VIEW_USER = gql(`
  query ViewUser($id: Int!, $options: ViewUserOptionsInput) {
    user(userId: $id, options: $options) {
      firstName
      lastName
      organization {
          name 
      }
      dateOfBirth
      country
      roles {
          code
      }
    }
}
`);
