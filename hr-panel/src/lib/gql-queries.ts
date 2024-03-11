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

export const LOAD_USERS = gql(`
  query LoadAllUsers ($options: ViewUserOptions) {
    users (options: $options) {
      id
      firstName
      middleName
      lastName
      email
      phone
      city
      country
      province
      roles
      profileIconUrl
      bannerUrl
      dateOfBirth
      dateJoined
      streetName
      pincode
      syncStatus
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

export const VIEW_USER_WITH_SCHEDULES = gql(`
  query ListUserSchedules ($userId: Int!) {
    user(id: $userId) {
      id
      firstName
      middleName
      lastName
      email
      phone
      city
      country
      province
      roles
      profileIconUrl
      bannerUrl
      schedules {
        id
        position {
          id
          title
          description
          hourlyWage
        }
        schedule {
          id
          title
          dateTimeStart
          dateTimeEnd
          createdBy {
            id
            email
            firstName
            lastName
            streetName
            city
            country
            province
            pincode
            dateOfBirth
            dateJoined
            phone
          }
          createdAt
        }
        user {
          id
          email
          firstName
          lastName
          streetName
          city
          country
          province
          pincode
          dateOfBirth
          dateJoined
          phone
        }
      }
    }
  }
`);

export const LIST_SCHEDULES = gql(`
  query ListAllSchedules ($filters: ListScheduleFilterInput) {
    scheduledShifts (filters: $filters) {
      id
      schedule {
        id
        title
        dateTimeStart
        dateTimeEnd
        createdBy {
          id
          email
          firstName
          lastName
          streetName
          city
          country
          province
          pincode
          dateOfBirth
          dateJoined
          phone
          profileIconUrl
          bannerUrl
        }
        createdAt
      }
      user {
        id
        email
        firstName
        lastName
        streetName
        city
        country
        province
        pincode
        dateOfBirth
        dateJoined
        phone
        profileIconUrl
        bannerUrl
      }
      position {
        id
        title
        description
        hourlyWage
      }
    }
  }
`);

export const SCHEDULE_SHIFT = gql(`
  mutation ScheduleShift($input: ScheduleInput!) {
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
