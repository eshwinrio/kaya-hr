/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: number; output: number; }
  ISODate: { input: string; output: string; }
};

export type ClockTime = {
  __typename?: 'ClockTime';
  endTime: Scalars['ISODate']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['ISODate']['output'];
  timesheetId: Scalars['Int']['output'];
};

export type CreateOrganizationInput = {
  bannerUrl: Scalars['String']['input'];
  logoUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  summary?: InputMaybe<Scalars['String']['input']>;
  webUrl: Scalars['String']['input'];
};

export type CreateUserInput = {
  addressL2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  dateJoined: Scalars['ISODate']['input'];
  dateOfBirth: Scalars['ISODate']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  pincode: Scalars['String']['input'];
  positionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  province: Scalars['String']['input'];
  roles?: InputMaybe<Array<Role>>;
  streetName: Scalars['String']['input'];
};

export type ListScheduleFilterInput = {
  from?: InputMaybe<Scalars['ISODate']['input']>;
  to?: InputMaybe<Scalars['ISODate']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganization: Scalars['Int']['output'];
  createPosition: Scalars['Int']['output'];
  createUser: Scalars['Int']['output'];
  scheduleShiftFor: Scalars['Int']['output'];
  syncUsers: UserSyncResult;
  unscheduleShift: Scalars['Int']['output'];
  updateOrganization: Scalars['Int']['output'];
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePositionArgs = {
  input: PositionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationScheduleShiftForArgs = {
  input: ScheduleInput;
  userId: Scalars['Int']['input'];
};


export type MutationSyncUsersArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUnscheduleShiftArgs = {
  shiftId: Scalars['Int']['input'];
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['Int']['input'];
  input: UpdateOrganizationInput;
};

export type Organization = {
  __typename?: 'Organization';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  webUrl?: Maybe<Scalars['String']['output']>;
};

export type Position = {
  __typename?: 'Position';
  description?: Maybe<Scalars['String']['output']>;
  hourlyWage?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type PositionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hourlyWage?: InputMaybe<Scalars['Decimal']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  scheduledShifts: Array<Maybe<Schedule>>;
  user: User;
  users: Array<Maybe<User>>;
};


export type QueryScheduledShiftsArgs = {
  filters?: InputMaybe<ListScheduleFilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
  options?: InputMaybe<ViewUserOptions>;
};

export enum Role {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Lead = 'LEAD',
  Manager = 'MANAGER',
  Super = 'SUPER'
}

export type Schedule = {
  __typename?: 'Schedule';
  dateTimeEnd: Scalars['ISODate']['output'];
  dateTimeStart: Scalars['ISODate']['output'];
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  position: Position;
  user?: Maybe<User>;
};

export type ScheduleInput = {
  dateTimeEnd: Scalars['ISODate']['input'];
  dateTimeStart: Scalars['ISODate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  positionId: Scalars['Int']['input'];
};

export enum SyncStatus {
  Fail = 'FAIL',
  Never = 'NEVER',
  Ok = 'OK'
}

export type Timesheet = {
  __typename?: 'Timesheet';
  hourlyWage: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UpdateOrganizationInput = {
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  webUrl?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  addressL2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  dateJoined: Scalars['ISODate']['output'];
  dateOfBirth: Scalars['ISODate']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  positions?: Maybe<Array<Maybe<Position>>>;
  province: Scalars['String']['output'];
  roles?: Maybe<Array<Role>>;
  schedules?: Maybe<Array<Maybe<Schedule>>>;
  status?: Maybe<Scalars['String']['output']>;
  streetName: Scalars['String']['output'];
  syncStatus?: Maybe<SyncStatus>;
  timesheets?: Maybe<Array<Maybe<Timesheet>>>;
};

export type UserSyncResult = {
  __typename?: 'UserSyncResult';
  accepted: Scalars['Int']['output'];
  rejected: Scalars['Int']['output'];
};

export type ViewUserOptions = {
  organization?: InputMaybe<Scalars['Boolean']['input']>;
  positons?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<Scalars['Boolean']['input']>;
  schedules?: InputMaybe<Scalars['Boolean']['input']>;
  timesheets?: InputMaybe<Scalars['Boolean']['input']>;
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, organization?: { __typename?: 'Organization', id: number, name: string, summary?: string | null, webUrl?: string | null, logoUrl?: string | null, bannerUrl?: string | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: number };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: number };

export type LoadAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type LoadAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, phone: string, dateJoined: any, dateOfBirth: any, streetName: string, pincode: string } | null> };

export type SyncUsersMutationVariables = Exact<{
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SyncUsersMutation = { __typename?: 'Mutation', syncUsers: { __typename?: 'UserSyncResult', accepted: number, rejected: number } };

export type ViewUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ViewUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, email: string, phone: string, dateOfBirth: any, streetName: string, addressL2?: string | null, city: string, country: string, province: string, pincode: string, dateJoined: any, roles?: Array<Role> | null, organization?: { __typename?: 'Organization', name: string } | null } };

export type ViewUserWithSchedulesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ViewUserWithSchedulesQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, email: string, phone: string, city: string, country: string, province: string, roles?: Array<Role> | null, schedules?: Array<{ __typename?: 'Schedule', id: number, dateTimeStart: any, dateTimeEnd: any, notes?: string | null, position: { __typename?: 'Position', id: number, title: string, description?: string | null, hourlyWage?: any | null } } | null> | null } };

export type ListSchedulesQueryVariables = Exact<{
  filters?: InputMaybe<ListScheduleFilterInput>;
}>;


export type ListSchedulesQuery = { __typename?: 'Query', scheduledShifts: Array<{ __typename?: 'Schedule', id: number, dateTimeStart: any, dateTimeEnd: any, notes?: string | null, user?: { __typename?: 'User', firstName: string, email: string, phone: string, positions?: Array<{ __typename?: 'Position', title: string, hourlyWage?: any | null } | null> | null } | null, position: { __typename?: 'Position', title: string, hourlyWage?: any | null } } | null> };

export type ScheduleShiftMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  options: ScheduleInput;
}>;


export type ScheduleShiftMutation = { __typename?: 'Mutation', scheduleShiftFor: number };


export const WhoAmIDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WhoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"webUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]}}]} as unknown as DocumentNode<WhoAmIQuery, WhoAmIQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const LoadAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}}]}}]}}]} as unknown as DocumentNode<LoadAllUsersQuery, LoadAllUsersQueryVariables>;
export const SyncUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}}]}}]}}]} as unknown as DocumentNode<SyncUsersMutation, SyncUsersMutationVariables>;
export const ViewUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"addressL2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<ViewUserQuery, ViewUserQueryVariables>;
export const ViewUserWithSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewUserWithSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positons"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"roles"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"schedules"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<ViewUserWithSchedulesQuery, ViewUserWithSchedulesQueryVariables>;
export const ListSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListScheduleFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledShifts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<ListSchedulesQuery, ListSchedulesQueryVariables>;
export const ScheduleShiftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ScheduleShift"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleShiftFor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}]}]}}]} as unknown as DocumentNode<ScheduleShiftMutation, ScheduleShiftMutationVariables>;