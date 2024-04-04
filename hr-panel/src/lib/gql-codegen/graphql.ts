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
  generateInvoice: Scalars['String']['output'];
  generatePayroll: Scalars['Int']['output'];
  generatePayslips?: Maybe<Scalars['Boolean']['output']>;
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


export type MutationGenerateInvoiceArgs = {
  payslipId: Scalars['Int']['input'];
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

export type PayslipPage = {
  __typename?: 'PayslipPage';
  clockTimes: Array<ClockTime>;
  deductions?: Maybe<Scalars['Decimal']['output']>;
  dispensedOn?: Maybe<Scalars['ISODate']['output']>;
  employee?: Maybe<User>;
  generatedOn: Scalars['ISODate']['output'];
  id: Scalars['Int']['output'];
  invoiceUuid?: Maybe<Scalars['String']['output']>;
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
  viewPayslip?: Maybe<PayslipPage>;
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


export type QueryViewPayslipArgs = {
  payslipId: Scalars['Int']['input'];
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

export type ActivePayslipsCardFragment = { __typename?: 'PayrollsIndex', activePayslips: Array<(
    { __typename?: 'Payslip', id: number }
    & { ' $fragmentRefs'?: { 'PayslipListItemFragment': PayslipListItemFragment } }
  )> } & { ' $fragmentName'?: 'ActivePayslipsCardFragment' };

export type ActivePayslipsActionGenerateMutationVariables = Exact<{ [key: string]: never; }>;


export type ActivePayslipsActionGenerateMutation = { __typename?: 'Mutation', generatePayslips?: boolean | null };

export type OutstandingAmountCardFragment = { __typename?: 'PayrollsIndex', amountOutstanding: any, previousPayrolls: Array<{ __typename?: 'Payroll', id: number, generatedOn: any, netOutstanding: any }> } & { ' $fragmentName'?: 'OutstandingAmountCardFragment' };

export type PayrollSummaryCardFragment = { __typename?: 'PayrollSummary', payrollId: number, periodStart: any, periodEnd: any, totalTasks: number, pendingTasks: number, completedTasks: number, rejectedTasks: number } & { ' $fragmentName'?: 'PayrollSummaryCardFragment' };

export type PayslipListItemFragment = { __typename?: 'Payslip', id: number, netPay: any, deductions?: any | null, paymentMethod?: string | null, generatedOn: any, employee: (
    { __typename?: 'User', id: number, firstName: string, lastName: string, email: string }
    & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
  ) } & { ' $fragmentName'?: 'PayslipListItemFragment' };

export type PunchTimingFragment = { __typename?: 'ClockTime', startTime: any, endTime?: any | null, netHours?: number | null } & { ' $fragmentName'?: 'PunchTimingFragment' };

export type ScheduleListItemFragment = { __typename?: 'Schedule', id: number, title: string, description?: string | null, dateTimeStart: any, dateTimeEnd: any, createdAt: any, employees?: Array<{ __typename?: 'User', firstName: string }> | null, createdBy?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
  ) | null } & { ' $fragmentName'?: 'ScheduleListItemFragment' };

export type ScheduleTimingFragment = { __typename?: 'Schedule', dateTimeStart: any, dateTimeEnd: any } & { ' $fragmentName'?: 'ScheduleTimingFragment' };

export type AvatarFragment = { __typename?: 'User', profileIconUrl?: string | null, firstName: string } & { ' $fragmentName'?: 'AvatarFragment' };

export type UserListItemFragment = (
  { __typename?: 'User', id: number, firstName: string, lastName: string, email: string }
  & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
) & { ' $fragmentName'?: 'UserListItemFragment' };

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

export type ActiveUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveUsersQuery = { __typename?: 'Query', punches: Array<{ __typename?: 'ClockTime', id: number, user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserListItemFragment': UserListItemFragment } }
    ) | null }> };

export type PayrollsIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type PayrollsIndexQuery = { __typename?: 'Query', payrollsIndex: (
    { __typename?: 'PayrollsIndex', week: number, year: number, currentCycleStart: any, currentCycleEnd: any, currentPayrollSummary?: (
      { __typename?: 'PayrollSummary' }
      & { ' $fragmentRefs'?: { 'PayrollSummaryCardFragment': PayrollSummaryCardFragment } }
    ) | null }
    & { ' $fragmentRefs'?: { 'OutstandingAmountCardFragment': OutstandingAmountCardFragment;'ActivePayslipsCardFragment': ActivePayslipsCardFragment } }
  ) };

export type SchedulesViewerQueryVariables = Exact<{
  filters?: InputMaybe<ListScheduleFilter>;
}>;


export type SchedulesViewerQuery = { __typename?: 'Query', schedules: Array<(
    { __typename?: 'Schedule', id: number }
    & { ' $fragmentRefs'?: { 'ScheduleListItemFragment': ScheduleListItemFragment } }
  )> };

export type ViewEmployeeQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ViewEmployeeQuery = { __typename?: 'Query', user: (
    { __typename?: 'User', id: number, firstName: string, middleName?: string | null, lastName: string, email: string, phone: string, city: string, country: string, province: string, roles?: Array<Role> | null, bannerUrl?: string | null, schedules?: Array<{ __typename?: 'ScheduleAssignment', id: number, position: { __typename?: 'Position', id: number, title: string, description?: string | null, hourlyWage?: any | null }, schedule: { __typename?: 'Schedule', id: number, title: string, dateTimeStart: any, dateTimeEnd: any, createdAt: any, createdBy?: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, phone: string } | null }, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, streetName: string, city: string, country: string, province: string, pincode: string, dateOfBirth: any, dateJoined: any, phone: string } }> | null }
    & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
  ) };

  export type ViewPayslipQueryVariables = Exact<{
    payslipId: Scalars['Int']['input'];
  }>;
  
  
  export type ViewPayslipQuery = { __typename?: 'Query', viewPayslip?: { __typename?: 'PayslipPage', id: number, generatedOn: any, invoiceUuid?: string | null, dispensedOn?: any | null, deductions?: any | null, netPay: any, paymentMethod?: string | null, paymentStatus: PaymentStatus, employee?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null, clockTimes: Array<(
        { __typename?: 'ClockTime' }
        & { ' $fragmentRefs'?: { 'PunchTimingFragment': PunchTimingFragment } }
      )> } | null };
  
  export type GenerateInvoiceMutationVariables = Exact<{
    payslipId: Scalars['Int']['input'];
  }>;
  
  
  export type GenerateInvoiceMutation = { __typename?: 'Mutation', generateInvoice: string };
    
  export type PickUserDialogQueryVariables = Exact<{
  options: ListUsersFilter;
}>;


export type PickUserDialogQuery = { __typename?: 'Query', users: Array<(
    { __typename?: 'User', id: number, firstName: string, lastName: string, email: string }
    & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
  )> };

export type PositionPickerQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionPickerQuery = { __typename?: 'Query', positionPicker: Array<{ __typename?: 'Position', id: number, title: string, description?: string | null, hourlyWage?: any | null, users?: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'AvatarFragment': AvatarFragment } }
    )> | null }> };

export const AvatarFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<AvatarFragment, unknown>;
export const PayslipListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PayslipListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Payslip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}},{"kind":"Field","name":{"kind":"Name","value":"deductions"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"generatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<PayslipListItemFragment, unknown>;
export const ActivePayslipsCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivePayslipsCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PayrollsIndex"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activePayslips"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PayslipListItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PayslipListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Payslip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}},{"kind":"Field","name":{"kind":"Name","value":"deductions"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"generatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]}}]} as unknown as DocumentNode<ActivePayslipsCardFragment, unknown>;
export const OutstandingAmountCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OutstandingAmountCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PayrollsIndex"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amountOutstanding"}},{"kind":"Field","name":{"kind":"Name","value":"previousPayrolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"generatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"netOutstanding"}}]}}]}}]} as unknown as DocumentNode<OutstandingAmountCardFragment, unknown>;
export const PayrollSummaryCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PayrollSummaryCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PayrollSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}},{"kind":"Field","name":{"kind":"Name","value":"periodStart"}},{"kind":"Field","name":{"kind":"Name","value":"periodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"pendingTasks"}},{"kind":"Field","name":{"kind":"Name","value":"completedTasks"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedTasks"}}]}}]} as unknown as DocumentNode<PayrollSummaryCardFragment, unknown>;
export const PunchTimingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}}]}}]} as unknown as DocumentNode<PunchTimingFragment, unknown>;
export const ScheduleListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<ScheduleListItemFragment, unknown>;
export const ScheduleTimingFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}}]}}]} as unknown as DocumentNode<ScheduleTimingFragment, unknown>;
export const UserListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<UserListItemFragment, unknown>;
export const ActivePayslipsActionGenerateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivePayslipsActionGenerate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePayslips"}}]}}]} as unknown as DocumentNode<ActivePayslipsActionGenerateMutation, ActivePayslipsActionGenerateMutationVariables>;
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
export const ActiveUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActiveUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"punches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"activeOnly"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserListItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]} as unknown as DocumentNode<ActiveUsersQuery, ActiveUsersQueryVariables>;
export const PayrollsIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PayrollsIndex"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollsIndex"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"week"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"currentCycleStart"}},{"kind":"Field","name":{"kind":"Name","value":"currentCycleEnd"}},{"kind":"Field","name":{"kind":"Name","value":"currentPayrollSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PayrollSummaryCard"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OutstandingAmountCard"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActivePayslipsCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PayslipListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Payslip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}},{"kind":"Field","name":{"kind":"Name","value":"deductions"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"generatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PayrollSummaryCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PayrollSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payrollId"}},{"kind":"Field","name":{"kind":"Name","value":"periodStart"}},{"kind":"Field","name":{"kind":"Name","value":"periodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"pendingTasks"}},{"kind":"Field","name":{"kind":"Name","value":"completedTasks"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedTasks"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OutstandingAmountCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PayrollsIndex"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amountOutstanding"}},{"kind":"Field","name":{"kind":"Name","value":"previousPayrolls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"generatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"netOutstanding"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActivePayslipsCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PayrollsIndex"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activePayslips"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PayslipListItem"}}]}}]}}]} as unknown as DocumentNode<PayrollsIndexQuery, PayrollsIndexQueryVariables>;
export const SchedulesViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SchedulesViewer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListScheduleFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ScheduleListItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ScheduleListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<SchedulesViewerQuery, SchedulesViewerQueryVariables>;
export const ViewEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeStart"}},{"kind":"Field","name":{"kind":"Name","value":"dateTimeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"streetName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<ViewEmployeeQuery, ViewEmployeeQueryVariables>;
export const ViewPayslipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewPayslip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payslipId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewPayslip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payslipId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payslipId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"generatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceUuid"}},{"kind":"Field","name":{"kind":"Name","value":"dispensedOn"}},{"kind":"Field","name":{"kind":"Name","value":"deductions"}},{"kind":"Field","name":{"kind":"Name","value":"netPay"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clockTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PunchTiming"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PunchTiming"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockTime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"netHours"}}]}}]} as unknown as DocumentNode<ViewPayslipQuery, ViewPayslipQueryVariables>;
export const GenerateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payslipId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payslipId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payslipId"}}}]}]}}]} as unknown as DocumentNode<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>;
export const PickUserDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PickUserDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<PickUserDialogQuery, PickUserDialogQueryVariables>;
export const PositionPickerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PositionPicker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionPicker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hourlyWage"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileIconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]} as unknown as DocumentNode<PositionPickerQuery, PositionPickerQueryVariables>;