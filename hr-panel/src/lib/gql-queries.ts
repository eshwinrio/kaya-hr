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
  query ViewUser($id: Int!) {
    user(id: $id) {
      id
      firstName
      middleName
      lastName
      email
      phone
      organization {
        name 
      }
      dateOfBirth
      streetName
      addressL2
      city
      country
      province
      pincode
      dateJoined
      dateOfBirth
      roles
    }
  }
`);

export const LIST_SCHEDULES = gql(`
  query ListSchedules ($filters: ListScheduleFilterInput) {
    scheduledShifts (filters: $filters) {
      id
      user {
          firstName
          email
          phone
          positions {
            title
            hourlyWage
          }
      }
      dateTimeStart
      dateTimeEnd
      position {
        title
        hourlyWage
      }
      notes
    }
  }
`);

export const SCHEDULE_SHIFT = gql(`
  mutation ScheduleShift($userId: Int!, $options: ScheduleInput!) {
    scheduleShiftFor(userId: $userId, input: $options)
  }
`);
