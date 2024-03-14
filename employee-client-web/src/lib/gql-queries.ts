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
      schedules {
        id
        position {
          title
          description
          hourlyWage
        }
        schedule {
          id
          title
          dateTimeStart
          dateTimeEnd
          createdAt
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
        }
      }
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

export const LIST_MY_SCHEDULES = gql(`
  query ListMySchedules ($options: ViewUserOptions) {
    currentUser(options: $options) {
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
      }
    }
  }
`);
