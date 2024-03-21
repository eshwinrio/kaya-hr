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
    "\n  fragment ScheduleAssignment on ScheduleAssignment {\n    id\n    schedule {\n      id\n      title\n      ...ScheduleTiming\n    }\n    position {\n      id\n      title\n    }\n    user {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.ScheduleAssignmentFragmentDoc,
    "\n  fragment ScheduleTiming on Schedule {\n    dateTimeStart\n    dateTimeEnd\n  }\n": types.ScheduleTimingFragmentDoc,
    "\n  fragment Timer on ClockTime {\n    startTime\n  }\n": types.TimerFragmentDoc,
    "\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n": types.AvatarFragmentDoc,
    "\n  query ListMySchedules ($options: ViewUserOptions) {\n    currentUser(options: $options) {\n      schedules {\n        ...ScheduleAssignment\n      }\n    }\n  }\n": types.ListMySchedulesDocument,
    "\n  query ListPunches($filter: ListPunchesFilter) {\n    listPunches (filter: $filter) {\n      activePunch {\n        ...Timer\n      }\n      history {\n        id\n        startTime\n        endTime\n      }\n    }\n  }\n": types.ListPunchesDocument,
    "\n  mutation RegisterPunch {\n    registerPunch {\n      id\n      startTime\n      endTime\n    }\n  }\n": types.RegisterPunchDocument,
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
export function gql(source: "\n  fragment ScheduleAssignment on ScheduleAssignment {\n    id\n    schedule {\n      id\n      title\n      ...ScheduleTiming\n    }\n    position {\n      id\n      title\n    }\n    user {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  fragment ScheduleAssignment on ScheduleAssignment {\n    id\n    schedule {\n      id\n      title\n      ...ScheduleTiming\n    }\n    position {\n      id\n      title\n    }\n    user {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ScheduleTiming on Schedule {\n    dateTimeStart\n    dateTimeEnd\n  }\n"): (typeof documents)["\n  fragment ScheduleTiming on Schedule {\n    dateTimeStart\n    dateTimeEnd\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Timer on ClockTime {\n    startTime\n  }\n"): (typeof documents)["\n  fragment Timer on ClockTime {\n    startTime\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n"): (typeof documents)["\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListMySchedules ($options: ViewUserOptions) {\n    currentUser(options: $options) {\n      schedules {\n        ...ScheduleAssignment\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListMySchedules ($options: ViewUserOptions) {\n    currentUser(options: $options) {\n      schedules {\n        ...ScheduleAssignment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListPunches($filter: ListPunchesFilter) {\n    listPunches (filter: $filter) {\n      activePunch {\n        ...Timer\n      }\n      history {\n        id\n        startTime\n        endTime\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPunches($filter: ListPunchesFilter) {\n    listPunches (filter: $filter) {\n      activePunch {\n        ...Timer\n      }\n      history {\n        id\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterPunch {\n    registerPunch {\n      id\n      startTime\n      endTime\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterPunch {\n    registerPunch {\n      id\n      startTime\n      endTime\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query WhoAmI {\n    currentUser {\n         id\n         ...Profile\n         phone\n         streetName\n         city\n         country\n         province\n         pincode\n         dateOfBirth\n         dateJoined\n         organization {\n           id\n           name\n           summary\n           webUrl\n           logoUrl\n           bannerUrl\n         }\n         dateJoined\n         positions {\n           id\n           title\n           description\n         }\n         ...Avatar\n         bannerUrl\n         schedules {\n           id\n           position {\n             title\n             description\n             hourlyWage\n           }\n           schedule {\n             id\n             title\n             dateTimeStart\n             dateTimeEnd\n             createdAt\n             createdBy {\n               id\n               email\n               firstName\n               lastName\n               streetName\n               city\n               country\n               province\n               pincode\n               dateOfBirth\n               dateJoined\n               phone\n             }\n           }\n         }\n       }\n     }\n"): (typeof documents)["\n  query WhoAmI {\n    currentUser {\n         id\n         ...Profile\n         phone\n         streetName\n         city\n         country\n         province\n         pincode\n         dateOfBirth\n         dateJoined\n         organization {\n           id\n           name\n           summary\n           webUrl\n           logoUrl\n           bannerUrl\n         }\n         dateJoined\n         positions {\n           id\n           title\n           description\n         }\n         ...Avatar\n         bannerUrl\n         schedules {\n           id\n           position {\n             title\n             description\n             hourlyWage\n           }\n           schedule {\n             id\n             title\n             dateTimeStart\n             dateTimeEnd\n             createdAt\n             createdBy {\n               id\n               email\n               firstName\n               lastName\n               streetName\n               city\n               country\n               province\n               pincode\n               dateOfBirth\n               dateJoined\n               phone\n             }\n           }\n         }\n       }\n     }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;