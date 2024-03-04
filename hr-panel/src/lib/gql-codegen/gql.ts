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
    "\n  query WhoAmI {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n    }\n  }\n": types.WhoAmIDocument,
    "\n  query LoadAllRoles {\n    roles {\n      id\n      code\n      title\n      description\n      hourlyWage\n    }\n  }\n": types.LoadAllRolesDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input)\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {\n    updateOrganization(id: $id, input: $input)\n  }\n": types.UpdateOrganizationDocument,
    "\n  query LoadAllUsers {\n    users {\n        id\n        firstName\n        lastName\n        email\n        phone\n        dateJoined\n        dateOfBirth\n        streetName\n        pincode\n    }\n  }\n": types.LoadAllUsersDocument,
    "\n  mutation SyncUsers($force: Boolean) {\n    syncUsers(force: $force) {\n      accepted\n      rejected\n    }\n  }\n": types.SyncUsersDocument,
    "\n  query ViewUser($id: Int!, $options: ViewUserOptionsInput) {\n    user(userId: $id, options: $options) {\n      firstName\n      lastName\n      organization {\n          name \n      }\n      dateOfBirth\n      country\n      roles {\n          code\n      }\n    }\n}\n": types.ViewUserDocument,
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
export function gql(source: "\n  query WhoAmI {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query WhoAmI {\n    currentUser {\n      id\n      firstName\n      lastName\n      email\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LoadAllRoles {\n    roles {\n      id\n      code\n      title\n      description\n      hourlyWage\n    }\n  }\n"): (typeof documents)["\n  query LoadAllRoles {\n    roles {\n      id\n      code\n      title\n      description\n      hourlyWage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input)\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {\n    updateOrganization(id: $id, input: $input)\n  }\n"): (typeof documents)["\n  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {\n    updateOrganization(id: $id, input: $input)\n  }\n"];
export function gql(source: "\n  query LoadAllUsers {\n    users {\n        id\n        firstName\n        lastName\n        email\n        phone\n        dateJoined\n        dateOfBirth\n        streetName\n        pincode\n    }\n  }\n"): (typeof documents)["\n  query LoadAllUsers {\n    users {\n        id\n        firstName\n        lastName\n        email\n        phone\n        dateJoined\n        dateOfBirth\n        streetName\n        pincode\n    }\n  }\n"];
export function gql(source: "\n  query LoadAllUsers {\n    users {\n        id\n        firstName\n        lastName\n        email\n        phone\n        dateJoined\n        dateOfBirth\n        streetName\n        pincode\n    }\n  }\n"): (typeof documents)["\n  query LoadAllUsers {\n    users {\n        id\n        firstName\n        lastName\n        email\n        phone\n        dateJoined\n        dateOfBirth\n        streetName\n        pincode\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SyncUsers($force: Boolean) {\n    syncUsers(force: $force) {\n      accepted\n      rejected\n    }\n  }\n"): (typeof documents)["\n  mutation SyncUsers($force: Boolean) {\n    syncUsers(force: $force) {\n      accepted\n      rejected\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ViewUser($id: Int!, $options: ViewUserOptionsInput) {\n    user(userId: $id, options: $options) {\n      firstName\n      lastName\n      organization {\n          name \n      }\n      dateOfBirth\n      country\n      roles {\n          code\n      }\n    }\n}\n"): (typeof documents)["\n  query ViewUser($id: Int!, $options: ViewUserOptionsInput) {\n    user(userId: $id, options: $options) {\n      firstName\n      lastName\n      organization {\n          name \n      }\n      dateOfBirth\n      country\n      roles {\n          code\n      }\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;