/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment Profile on User {\n    email\n    firstName\n    middleName\n    lastName\n    ...Avatar\n  }\n": types.ProfileFragmentDoc,
    "\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n": types.AvatarFragmentDoc,
    "\n  fragment ContactDetails on User {\n    email\n    phone\n    streetName\n    city\n    province\n    pincode\n    country\n  }\n": types.ContactDetailsFragmentDoc,
    "\n  fragment UserOrganization on User {\n    organization {\n      id\n      name\n      summary\n      webUrl\n      logoUrl\n      bannerUrl\n    }\n  }\n": types.UserOrganizationFragmentDoc,
    "\n  query ListUserSchedules ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n": types.ListUserSchedulesDocument,
    "\n  query ViewUser ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      streetName\n      addressL2\n      city\n      country\n      province\n      pincode\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n    }\n  }\n": types.ViewUserDocument,
    "\n  mutation UpdateUser($userId: Int!, $input: UpdateUserInput!) {\n    updateUser(userId: $userId, input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query ListMySchedules ($options: ViewUserOptions) {\n    currentUser(options: $options) {\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n      }\n    }\n  }\n": types.ListMySchedulesDocument,
    "\n  mutation RegisterPunch {\n    registerPunch {\n      id\n      startTime\n      endTime\n    }\n  }\n": types.RegisterPunchDocument,
    "\n  query ListPunches($filter: ListPunchesFilter) {\n    listPunches (filter: $filter) {\n      activePunch {\n        id\n        startTime\n        endTime\n      }\n      history {\n        id\n        startTime\n        endTime\n      }\n    }\n  }\n": types.ListPunchesDocument,
    "\n  query WhoAmI {\n    currentUser {\n         id\n         ...Profile\n         phone\n         streetName\n         city\n         country\n         province\n         pincode\n         dateOfBirth\n         dateJoined\n         organization {\n           id\n           name\n           summary\n           webUrl\n           logoUrl\n           bannerUrl\n         }\n         dateJoined\n         positions {\n           id\n           title\n           description\n         }\n         ...Avatar\n         bannerUrl\n         schedules {\n           id\n           position {\n             title\n             description\n             hourlyWage\n           }\n           schedule {\n             id\n             title\n             dateTimeStart\n             dateTimeEnd\n             createdAt\n             createdBy {\n               id\n               email\n               firstName\n               lastName\n               streetName\n               city\n               country\n               province\n               pincode\n               dateOfBirth\n               dateJoined\n               phone\n             }\n           }\n         }\n       }\n     }\n": types.WhoAmIDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Profile on User {\n    email\n    firstName\n    middleName\n    lastName\n    ...Avatar\n  }\n"): (typeof documents)["\n  fragment Profile on User {\n    email\n    firstName\n    middleName\n    lastName\n    ...Avatar\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n"): (typeof documents)["\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ContactDetails on User {\n    email\n    phone\n    streetName\n    city\n    province\n    pincode\n    country\n  }\n"): (typeof documents)["\n  fragment ContactDetails on User {\n    email\n    phone\n    streetName\n    city\n    province\n    pincode\n    country\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserOrganization on User {\n    organization {\n      id\n      name\n      summary\n      webUrl\n      logoUrl\n      bannerUrl\n    }\n  }\n"): (typeof documents)["\n  fragment UserOrganization on User {\n    organization {\n      id\n      name\n      summary\n      webUrl\n      logoUrl\n      bannerUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListUserSchedules ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListUserSchedules ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ViewUser ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      streetName\n      addressL2\n      city\n      country\n      province\n      pincode\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n    }\n  }\n"): (typeof documents)["\n  query ViewUser ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      streetName\n      addressL2\n      city\n      country\n      province\n      pincode\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($userId: Int!, $input: UpdateUserInput!) {\n    updateUser(userId: $userId, input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($userId: Int!, $input: UpdateUserInput!) {\n    updateUser(userId: $userId, input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListMySchedules ($options: ViewUserOptions) {\n    currentUser(options: $options) {\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListMySchedules ($options: ViewUserOptions) {\n    currentUser(options: $options) {\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterPunch {\n    registerPunch {\n      id\n      startTime\n      endTime\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterPunch {\n    registerPunch {\n      id\n      startTime\n      endTime\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListPunches($filter: ListPunchesFilter) {\n    listPunches (filter: $filter) {\n      activePunch {\n        id\n        startTime\n        endTime\n      }\n      history {\n        id\n        startTime\n        endTime\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPunches($filter: ListPunchesFilter) {\n    listPunches (filter: $filter) {\n      activePunch {\n        id\n        startTime\n        endTime\n      }\n      history {\n        id\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query WhoAmI {\n    currentUser {\n         id\n         ...Profile\n         phone\n         streetName\n         city\n         country\n         province\n         pincode\n         dateOfBirth\n         dateJoined\n         organization {\n           id\n           name\n           summary\n           webUrl\n           logoUrl\n           bannerUrl\n         }\n         dateJoined\n         positions {\n           id\n           title\n           description\n         }\n         ...Avatar\n         bannerUrl\n         schedules {\n           id\n           position {\n             title\n             description\n             hourlyWage\n           }\n           schedule {\n             id\n             title\n             dateTimeStart\n             dateTimeEnd\n             createdAt\n             createdBy {\n               id\n               email\n               firstName\n               lastName\n               streetName\n               city\n               country\n               province\n               pincode\n               dateOfBirth\n               dateJoined\n               phone\n             }\n           }\n         }\n       }\n     }\n"): (typeof documents)["\n  query WhoAmI {\n    currentUser {\n         id\n         ...Profile\n         phone\n         streetName\n         city\n         country\n         province\n         pincode\n         dateOfBirth\n         dateJoined\n         organization {\n           id\n           name\n           summary\n           webUrl\n           logoUrl\n           bannerUrl\n         }\n         dateJoined\n         positions {\n           id\n           title\n           description\n         }\n         ...Avatar\n         bannerUrl\n         schedules {\n           id\n           position {\n             title\n             description\n             hourlyWage\n           }\n           schedule {\n             id\n             title\n             dateTimeStart\n             dateTimeEnd\n             createdAt\n             createdBy {\n               id\n               email\n               firstName\n               lastName\n               streetName\n               city\n               country\n               province\n               pincode\n               dateOfBirth\n               dateJoined\n               phone\n             }\n           }\n         }\n       }\n     }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;