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
  approvalStatus: PunchApprovalStatus;
  earning?: Maybe<Scalars['Decimal']['output']>;
  endTime?: Maybe<Scalars['ISODate']['output']>;
  hourlyWage: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  netHours?: Maybe<Scalars['Int']['output']>;
  payroll?: Maybe<Payroll>;
  startTime: Scalars['ISODate']['output'];
  user?: Maybe<User>;
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
  positionId: Scalars['Int']['input'];
  profileIconUrl?: InputMaybe<Scalars['String']['input']>;
  province: Scalars['String']['input'];
  roles?: InputMaybe<Array<Role>>;
  status?: InputMaybe<Scalars['String']['input']>;
  streetName: Scalars['String']['input'];
};

export type GeneratePayrollOptions = {
  employeeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodEnd: Scalars['ISODate']['input'];
  periodStart: Scalars['ISODate']['input'];
};

export type ListPunchesFilter = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['ISODate']['input']>;
  organizationId?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Pagination>;
  paymentStatus?: InputMaybe<Array<PaymentStatus>>;
  to?: InputMaybe<Scalars['ISODate']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ListScheduleFilter = {
  createdByUserId?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['ISODate']['input']>;
  pagination?: InputMaybe<Pagination>;
  title?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['ISODate']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ListUsersFilter = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<Role>>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignUserToSchedule: ScheduleAssignment;
  createOrganization: Organization;
  createPosition: Position;
  createSchedule: Schedule;
  createUser: User;
  deleteSchedule: Schedule;
  generatePayroll: Scalars['Int']['output'];
  registerPunch: ClockTime;
  syncUsers: UserSyncResult;
  updateOrganization: Organization;
  updateSchedule: Schedule;
  updateUser: User;
};


export type MutationAssignUserToScheduleArgs = {
  positionId: Scalars['Int']['input'];
  scheduleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
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


export type MutationGeneratePayrollArgs = {
  options: GeneratePayrollOptions;
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

export type Pagination = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum PaymentStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type Payroll = {
  __typename?: 'Payroll';
  generatedOn: Scalars['ISODate']['output'];
  id: Scalars['Int']['output'];
  netOutstanding: Scalars['Decimal']['output'];
  organization?: Maybe<Organization>;
  payslips?: Maybe<Array<Payslip>>;
  periodEnd: Scalars['ISODate']['output'];
  periodStart: Scalars['ISODate']['output'];
};

export type PayrollPeriod = {
  __typename?: 'PayrollPeriod';
  endsOn: Scalars['ISODate']['output'];
  startsOn: Scalars['ISODate']['output'];
};

export type PayrollSummary = {
  __typename?: 'PayrollSummary';
  completedTasks: Scalars['Int']['output'];
  payrollId: Scalars['Int']['output'];
  pendingTasks: Scalars['Int']['output'];
  periodEnd: Scalars['ISODate']['output'];
  periodStart: Scalars['ISODate']['output'];
  rejectedTasks: Scalars['Int']['output'];
  totalTasks: Scalars['Int']['output'];
};

export type PayrollsIndex = {
  __typename?: 'PayrollsIndex';
  activePayslips: Array<Payslip>;
  amountOutstanding: Scalars['Decimal']['output'];
  currentCycleEnd: Scalars['ISODate']['output'];
  currentCycleStart: Scalars['ISODate']['output'];
  currentPayrollSummary?: Maybe<PayrollSummary>;
  previousPayrolls: Array<Payroll>;
  week: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type Payslip = {
  __typename?: 'Payslip';
  clockTimes?: Maybe<Array<ClockTime>>;
  deductions?: Maybe<Scalars['Decimal']['output']>;
  dispensedOn?: Maybe<Scalars['ISODate']['output']>;
  employee: User;
  generatedOn: Scalars['ISODate']['output'];
  id: Scalars['Int']['output'];
  netPay: Scalars['Decimal']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentStatus: PaymentStatus;
};

export type PayslipsFilter = {
  employeeId?: InputMaybe<Scalars['Int']['input']>;
  onlyCurrentPeriod?: InputMaybe<Scalars['Boolean']['input']>;
  onlyPending?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Position = {
  __typename?: 'Position';
  description?: Maybe<Scalars['String']['output']>;
  hourlyWage?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  organization?: Maybe<Organization>;
  schedules?: Maybe<Array<Schedule>>;
  title: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type PositionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hourlyWage?: InputMaybe<Scalars['Decimal']['input']>;
  title: Scalars['String']['input'];
};

export enum PunchApprovalStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  payrollPeriods?: Maybe<PayrollPeriod>;
  payrolls: Array<Payroll>;
  payrollsIndex: PayrollsIndex;
  payslips: Array<Payslip>;
  positionPicker: Array<Position>;
  punches: Array<ClockTime>;
  schedule: Schedule;
  scheduledShifts: Array<ScheduleAssignment>;
  schedules: Array<Schedule>;
  user: User;
  users: Array<User>;
};


export type QueryCurrentUserArgs = {
  options?: InputMaybe<ViewUserOptions>;
};


export type QueryPayslipsArgs = {
  filter?: InputMaybe<PayslipsFilter>;
};


export type QueryPunchesArgs = {
  filter?: InputMaybe<ListPunchesFilter>;
};


export type QueryScheduleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryScheduledShiftsArgs = {
  filters?: InputMaybe<ListScheduleFilter>;
};


export type QuerySchedulesArgs = {
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
  description?: Maybe<Scalars['String']['output']>;
  employees?: Maybe<Array<User>>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ScheduleAssigneeInput = {
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
  description?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum SyncStatus {
  Fail = 'FAIL',
  Never = 'NEVER',
  Ok = 'OK'
}

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
  positionId: Scalars['Int']['input'];
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
};

export type UserSyncResult = {
  __typename?: 'UserSyncResult';
  accepted: Scalars['Int']['output'];
  rejected: Scalars['Int']['output'];
};

export type ViewUserOptions = {
  scheduleFilters?: InputMaybe<ListScheduleFilter>;
};

export type ProfileFragment = (
  { __typename?: 'User', email: string, firstName: string, middleName?: string | null, lastName: string }
  & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
) & { ' $fragmentName'?: 'ProfileFragment' };

export type PunchHistoryFragment = (
  { __typename?: 'ClockTime', id: number, netHours?: number | null, hourlyWage: any, earning?: any | null }
  & { ' $fragmentRefs'?: { 'PunchTimingFragment': PunchTimingFragment } }
) & { ' $fragmentName'?: 'PunchHistoryFragment' };

export type PunchTimingFragment = { __typename?: 'ClockTime', startTime: any, endTime?: any | null, netHours?: number | null } & { ' $fragmentName'?: 'PunchTimingFragment' };

export type ScheduleAssignmentFragment = { __typename?: 'ScheduleAssignment', id: number, schedule: (
    { __typename?: 'Schedule', id: number, title: string }
    & { ' $fragmentRefs'?: { 'ScheduleTimingFragment': ScheduleTimingFragment } }
  ), position: { __typename?: 'Position', id: number, title: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string } } & { ' $fragmentName'?: 'ScheduleAssignmentFragment' };

export type ScheduleTimingFragment = { __typename?: 'Schedule', dateTimeStart: any, dateTimeEnd: any } & { ' $fragmentName'?: 'ScheduleTimingFragment' };

export type TimerFragment = { __typename?: 'ClockTime', startTime: any } & { ' $fragmentName'?: 'TimerFragment' };

export type AvatarFragment = { __typename?: 'User', profileIconUrl?: string | null, firstName: string } & { ' $fragmentName'?: 'AvatarFragment' };

export type ListMySchedulesQueryVariables = Exact<{
  options?: InputMaybe<ViewUserOptions>;
}>;


export type ListMySchedulesQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', schedules?: Array<(
      { __typename?: 'ScheduleAssignment' }
      & { ' $fragmentRefs'?: { 'ScheduleAssignmentFragment': ScheduleAssignmentFragment } }
    )> | null } };

export type GrossEarningsQueryVariables = Exact<{ [key: string]: never; }>;


export type GrossEarningsQuery = { __typename?: 'Query', punches: Array<{ __typename?: 'ClockTime', earning?: any | null }> };

export type ActivePunchesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivePunchesQuery = { __typename?: 'Query', punches: Array<(
    { __typename?: 'ClockTime' }
    & { ' $fragmentRefs'?: { 'TimerFragment': TimerFragment } }
  )> };

export type ClosedPunchesQueryVariables = Exact<{
  filter?: InputMaybe<ListPunchesFilter>;
}>;


export type ClosedPunchesQuery = { __typename?: 'Query', punches: Array<(
    { __typename?: 'ClockTime' }
    & { ' $fragmentRefs'?: { 'PunchHistoryFragment': PunchHistoryFragment } }
  )> };

export type RegisterPunchMutationVariables = Exact<{ [key: string]: never; }>;


export type RegisterPunchMutation = { __typename?: 'Mutation', registerPunch: { __typename?: 'ClockTime', id: number, startTime: any, endTime?: any | null } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', currentUser: (
    { __typename?: 'User', id: number, organization?: { __typename?: 'Organization', id: number, name: string, summary?: string | null, webUrl?: string | null, logoUrl?: string | null, bannerUrl?: string | null } | null }
    & { ' $fragmentRefs'?: { 'ProfileFragment': ProfileFragment;'AvatarFragment': AvatarFragment } }
  ) };

export const AvatarFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<AvatarFragment, unknown>;
export const ProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<ProfileFragment, unknown>;
export const PunchTimingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}}]}}]} as unknown as DocumentNode<PunchTimingFragment, unknown>;
export const PunchHistoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}},{"kind":"Field","name":{"kind":"Name","value":"earning"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PunchTiming"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}}]}}]} as unknown as DocumentNode<PunchHistoryFragment, unknown>;
export const ScheduleTimingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}}]}}]} as unknown as DocumentNode<ScheduleTimingFragment, unknown>;
export const ScheduleAssignmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleAssignment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleAssignment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScheduleTiming"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}}]}}]} as unknown as DocumentNode<ScheduleAssignmentFragment, unknown>;
export const TimerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<TimerFragment, unknown>;
export const ListMySchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListMySchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ViewUserOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScheduleAssignment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleAssignment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleAssignment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScheduleTiming"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<ListMySchedulesQuery, ListMySchedulesQueryVariables>;
export const GrossEarningsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GrossEarnings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"punches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"paymentStatus"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"PENDING"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"earning"}}]}}]}}]} as unknown as DocumentNode<GrossEarningsQuery, GrossEarningsQueryVariables>;
export const ActivePunchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActivePunches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"punches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"activeOnly"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}}]}}]} as unknown as DocumentNode<ActivePunchesQuery, ActivePunchesQueryVariables>;
export const ClosedPunchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClosedPunches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPunchesFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"punches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PunchHistory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}},{"kind":"Field","name":{"kind":"Name","value":"earning"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PunchTiming"}}]}}]} as unknown as DocumentNode<ClosedPunchesQuery, ClosedPunchesQueryVariables>;
export const RegisterPunchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterPunch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerPunch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]} as unknown as DocumentNode<RegisterPunchMutation, RegisterPunchMutationVariables>;
export const WhoAmIDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WhoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Profile"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"webUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]} as unknown as DocumentNode<WhoAmIQuery, WhoAmIQueryVariables>;