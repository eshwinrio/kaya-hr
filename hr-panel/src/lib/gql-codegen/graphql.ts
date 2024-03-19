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
  Decimal: { input: any; output: any; }
  ISODate: { input: any; output: any; }
};

export type ClockTime = {
  __typename?: 'ClockTime';
  endTime?: Maybe<Scalars['ISODate']['output']>;
  id: Scalars['Int']['output'];
  startTime: Scalars['ISODate']['output'];
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
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  dateJoined: Scalars['ISODate']['input'];
  dateOfBirth: Scalars['ISODate']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['Int']['input']>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  pincode: Scalars['String']['input'];
  positionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  profileIconUrl?: InputMaybe<Scalars['String']['input']>;
  province: Scalars['String']['input'];
  roles?: InputMaybe<Array<Role>>;
  status?: InputMaybe<Scalars['String']['input']>;
  streetName: Scalars['String']['input'];
};

export type ListPunches = {
  __typename?: 'ListPunches';
  activePunch?: Maybe<ClockTime>;
  history?: Maybe<Array<ClockTime>>;
};

export type ListPunchesFilter = {
  organizationId?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ListScheduleFilter = {
  createdByUserId?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['ISODate']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['ISODate']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ListUsersFilter = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<Role>>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganization: Organization;
  createPosition: Position;
  createSchedule: Schedule;
  createUser: User;
  deleteSchedule: Schedule;
  registerPunch: ClockTime;
  syncUsers: UserSyncResult;
  updateOrganization: Organization;
  updateSchedule: Schedule;
  updateUser: User;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePositionArgs = {
  input: PositionInput;
};


export type MutationCreateScheduleArgs = {
  input: ScheduleInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteScheduleArgs = {
  scheduleId: Scalars['Int']['input'];
};


export type MutationSyncUsersArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['Int']['input'];
  input: UpdateOrganizationInput;
};


export type MutationUpdateScheduleArgs = {
  input: ScheduleInput;
  scheduleId: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  userId: Scalars['Int']['input'];
};

export type Organization = {
  __typename?: 'Organization';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<User>>;
  webUrl?: Maybe<Scalars['String']['output']>;
};

export type Position = {
  __typename?: 'Position';
  description?: Maybe<Scalars['String']['output']>;
  hourlyWage?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  schedules?: Maybe<Array<User>>;
  title: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type PositionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hourlyWage?: InputMaybe<Scalars['Decimal']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  listPunches: ListPunches;
  schedule: Schedule;
  scheduledShifts: Array<ScheduleAssignment>;
  user: User;
  users: Array<User>;
};


export type QueryCurrentUserArgs = {
  options?: InputMaybe<ViewUserOptions>;
};


export type QueryListPunchesArgs = {
  filter?: InputMaybe<ListPunchesFilter>;
};


export type QueryScheduleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryScheduledShiftsArgs = {
  filters?: InputMaybe<ListScheduleFilter>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
  options?: InputMaybe<ViewUserOptions>;
};


export type QueryUsersArgs = {
  options?: InputMaybe<ListUsersFilter>;
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
  createdAt: Scalars['ISODate']['output'];
  createdBy?: Maybe<User>;
  dateTimeEnd: Scalars['ISODate']['output'];
  dateTimeStart: Scalars['ISODate']['output'];
  employees?: Maybe<Array<User>>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  positions?: Maybe<Array<Position>>;
  title: Scalars['String']['output'];
};

export type ScheduleAssigneeInput = {
  positionId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type ScheduleAssignment = {
  __typename?: 'ScheduleAssignment';
  id: Scalars['Int']['output'];
  position: Position;
  schedule: Schedule;
  user: User;
};

export type ScheduleInput = {
  assignees?: InputMaybe<Array<ScheduleAssigneeInput>>;
  dateTimeEnd: Scalars['ISODate']['input'];
  dateTimeStart: Scalars['ISODate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateUserInput = {
  addressL2?: InputMaybe<Scalars['String']['input']>;
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  dateJoined?: InputMaybe<Scalars['ISODate']['input']>;
  dateOfBirth?: InputMaybe<Scalars['ISODate']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
  positionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  profileIconUrl?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Role>>;
  status?: InputMaybe<Scalars['String']['input']>;
  streetName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  addressL2?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
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
  positions?: Maybe<Array<Position>>;
  profileIconUrl?: Maybe<Scalars['String']['output']>;
  province: Scalars['String']['output'];
  roles?: Maybe<Array<Role>>;
  schedules?: Maybe<Array<ScheduleAssignment>>;
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
  scheduleFilters?: InputMaybe<ListScheduleFilter>;
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: number, email: string, phone: string, firstName: string, middleName?: string | null, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, roles?: Array<Role> | null, profileIconUrl?: string | null, bannerUrl?: string | null, organization?: { __typename?: 'Organization', id: number, name: string, summary?: string | null, webUrl?: string | null, logoUrl?: string | null, bannerUrl?: string | null } | null, positions?: Array<{ __typename?: 'Position', id: number, title: string, description?: string | null }> | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, dateOfBirth: any, email: string, streetName: string, addressL2?: string | null, city: string, pincode: string, province: string, phone: string, country: string, dateJoined: any, status?: string | null, syncStatus?: SyncStatus | null, profileIconUrl?: string | null, bannerUrl?: string | null, roles?: Array<Role> | null, organization?: { __typename?: 'Organization', id: number, name: string, summary?: string | null, webUrl?: string | null, logoUrl?: string | null, bannerUrl?: string | null } | null, positions?: Array<{ __typename?: 'Position', id: number, title: string }> | null } };

export type UpdateOrganizationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: number, name: string, summary?: string | null, webUrl?: string | null, logoUrl?: string | null, bannerUrl?: string | null } };

export type LoadAllUsersQueryVariables = Exact<{
  options?: InputMaybe<ListUsersFilter>;
}>;


export type LoadAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, email: string, phone: string, city: string, country: string, province: string, roles?: Array<Role> | null, profileIconUrl?: string | null, bannerUrl?: string | null, dateOfBirth: any, dateJoined: any, streetName: string, pincode: string, syncStatus?: SyncStatus | null, positions?: Array<{ __typename?: 'Position', id: number, title: string }> | null }> };

export type SyncUsersMutationVariables = Exact<{
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SyncUsersMutation = { __typename?: 'Mutation', syncUsers: { __typename?: 'UserSyncResult', accepted: number, rejected: number } };

export type ListUserSchedulesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ListUserSchedulesQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, email: string, phone: string, city: string, country: string, province: string, roles?: Array<Role> | null, profileIconUrl?: string | null, bannerUrl?: string | null, schedules?: Array<{ __typename?: 'ScheduleAssignment', id: number, position: { __typename?: 'Position', id: number, title: string, description?: string | null, hourlyWage?: any | null }, schedule: { __typename?: 'Schedule', id: number, title: string, dateTimeStart: any, dateTimeEnd: any, createdAt: any, createdBy?: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, phone: string } | null }, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, phone: string } }> | null } };

export type ViewUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ViewUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, email: string, phone: string, streetName: string, addressL2?: string | null, city: string, country: string, province: string, pincode: string, roles?: Array<Role> | null, profileIconUrl?: string | null, bannerUrl?: string | null, dateOfBirth: any, dateJoined: any } };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, dateOfBirth: any, email: string, streetName: string, addressL2?: string | null, city: string, pincode: string, province: string, phone: string, country: string, dateJoined: any, status?: string | null, syncStatus?: SyncStatus | null, profileIconUrl?: string | null, bannerUrl?: string | null, roles?: Array<Role> | null, organization?: { __typename?: 'Organization', id: number, name: string, summary?: string | null, webUrl?: string | null, logoUrl?: string | null, bannerUrl?: string | null } | null, positions?: Array<{ __typename?: 'Position', id: number, title: string }> | null } };

export type ListAllSchedulesQueryVariables = Exact<{
  filters?: InputMaybe<ListScheduleFilter>;
}>;


export type ListAllSchedulesQuery = { __typename?: 'Query', scheduledShifts: Array<{ __typename?: 'ScheduleAssignment', id: number, schedule: { __typename?: 'Schedule', id: number, title: string, dateTimeStart: any, dateTimeEnd: any, createdAt: any, createdBy?: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, phone: string, profileIconUrl?: string | null, bannerUrl?: string | null } | null }, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, phone: string, profileIconUrl?: string | null, bannerUrl?: string | null }, position: { __typename?: 'Position', id: number, title: string, description?: string | null, hourlyWage?: any | null } }> };

export type CreateScheduleMutationVariables = Exact<{
  input: ScheduleInput;
}>;


export type CreateScheduleMutation = { __typename?: 'Mutation', createSchedule: { __typename?: 'Schedule', id: number, title: string, dateTimeStart: any, dateTimeEnd: any, employees?: Array<{ __typename?: 'User', id: number, email: string, positions?: Array<{ __typename?: 'Position', title: string }> | null }> | null } };


export const WhoAmIDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WhoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"webUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]} as unknown as DocumentNode<WhoAmIQuery, WhoAmIQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"addressL2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"syncStatus"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"webUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"webUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const LoadAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoadAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"syncStatus"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<LoadAllUsersQuery, LoadAllUsersQueryVariables>;
export const SyncUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}}]}}]}}]} as unknown as DocumentNode<SyncUsersMutation, SyncUsersMutationVariables>;
export const ListUserSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUserSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListUserSchedulesQuery, ListUserSchedulesQueryVariables>;
export const ViewUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"addressL2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}}]}}]}}]} as unknown as DocumentNode<ViewUserQuery, ViewUserQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"addressL2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"syncStatus"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"webUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const ListAllSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListScheduleFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledShifts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}}]}}]}}]}}]} as unknown as DocumentNode<ListAllSchedulesQuery, ListAllSchedulesQueryVariables>;
export const CreateScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduleMutation, CreateScheduleMutationVariables>;