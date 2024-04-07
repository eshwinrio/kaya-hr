import { gql } from "./gql-codegen/gql";

export const WHOAMI = gql(`
  query WhoAmI {
    currentUser {
      id
      email
      phone
      firstName
      middleName
      lastName
      streetName
      city
      country
      province
      pincode
      dateOfBirth
      dateJoined
      organization {
        id
        name
        summary
        webUrl
        logoUrl
        bannerUrl
      }
      roles
      dateJoined
      positions {
        id
        title
        description
      }
      profileIconUrl
      bannerUrl
    }
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      middleName
      lastName
      dateOfBirth
      email
      streetName
      addressL2
      city
      pincode
      province
      phone
      country
      dateJoined
      status
      syncStatus
      profileIconUrl
      bannerUrl
      organization {
        id
        name
        summary
        webUrl
        logoUrl
        bannerUrl
      }
      roles
      positions {
        id
        title
      }
    }
  }
`);

export const UPDATE_ORGANIZATION = gql(`
  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {
    updateOrganization(id: $id, input: $input) {
      id
      name
      summary
      webUrl
      logoUrl
      bannerUrl
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
  query ViewUser ($userId: Int!) {
    user(id: $userId) {
      id
      firstName
      middleName
      lastName
      email
      phone
      streetName
      addressL2
      city
      country
      province
      pincode
      roles
      profileIconUrl
      bannerUrl
      dateOfBirth
      dateJoined
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation UpdateUser($userId: Int!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      id
      firstName
      middleName
      lastName
      dateOfBirth
      email
      streetName
      addressL2
      city
      pincode
      province
      phone
      country
      dateJoined
      status
      syncStatus
      profileIconUrl
      bannerUrl
      organization {
        id
        name
        summary
        webUrl
        logoUrl
        bannerUrl
      }
      roles
      positions {
        id
        title
      }
    }
  }
`);

export const CREATE_SCHEDULE = gql(`
  mutation CreateSchedule($input: ScheduleInput!) {
    createSchedule(input: $input) {
      id
      title
      dateTimeStart
      dateTimeEnd
      employees {
        id
        email
        positions {
          title
        }
      }
    }
  }
`);
