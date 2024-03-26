import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloServerContext } from '../apollo.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  earning?: Maybe<Scalars['Decimal']['output']>;
  endTime?: Maybe<Scalars['ISODate']['output']>;
  hourlyWage: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  netHours?: Maybe<Scalars['Int']['output']>;
  paymentStatus: PaymentStatus;
  payroll?: Maybe<Payroll>;
  startTime: Scalars['ISODate']['output'];
  user: User;
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

export type ListPunches = {
  __typename?: 'ListPunches';
  active: Array<ClockTime>;
  history: Array<ClockTime>;
};

export type ListPunchesFilter = {
  organizationId?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  paymentStatus?: InputMaybe<Array<PaymentStatus>>;
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

export enum PaymentStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type Payroll = {
  __typename?: 'Payroll';
  clockTimes: Array<ClockTime>;
  deductions?: Maybe<Scalars['Decimal']['output']>;
  dispensedOn?: Maybe<Scalars['ISODate']['output']>;
  employee: User;
  generatedOn: Scalars['ISODate']['output'];
  id: Scalars['Int']['output'];
  netPay: Scalars['Decimal']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  periodEnd: Scalars['ISODate']['output'];
  periodStart: Scalars['ISODate']['output'];
  totalHours: Scalars['Decimal']['output'];
};

export type Position = {
  __typename?: 'Position';
  description?: Maybe<Scalars['String']['output']>;
  hourlyWage?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  schedules?: Maybe<Array<Schedule>>;
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
  payrolls: Array<Payroll>;
  punches: ListPunches;
  schedule: Schedule;
  scheduledShifts: Array<ScheduleAssignment>;
  user: User;
  users: Array<User>;
};


export type QueryCurrentUserArgs = {
  options?: InputMaybe<ViewUserOptions>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ClockTime: ResolverTypeWrapper<ClockTime>;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateUserInput: CreateUserInput;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  GeneratePayrollOptions: GeneratePayrollOptions;
  ISODate: ResolverTypeWrapper<Scalars['ISODate']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ListPunches: ResolverTypeWrapper<ListPunches>;
  ListPunchesFilter: ListPunchesFilter;
  ListScheduleFilter: ListScheduleFilter;
  ListUsersFilter: ListUsersFilter;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  PaymentStatus: PaymentStatus;
  Payroll: ResolverTypeWrapper<Payroll>;
  Position: ResolverTypeWrapper<Position>;
  PositionInput: PositionInput;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  Schedule: ResolverTypeWrapper<Schedule>;
  ScheduleAssigneeInput: ScheduleAssigneeInput;
  ScheduleAssignment: ResolverTypeWrapper<ScheduleAssignment>;
  ScheduleInput: ScheduleInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SyncStatus: SyncStatus;
  UpdateOrganizationInput: UpdateOrganizationInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserSyncResult: ResolverTypeWrapper<UserSyncResult>;
  ViewUserOptions: ViewUserOptions;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  ClockTime: ClockTime;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateUserInput: CreateUserInput;
  Decimal: Scalars['Decimal']['output'];
  GeneratePayrollOptions: GeneratePayrollOptions;
  ISODate: Scalars['ISODate']['output'];
  Int: Scalars['Int']['output'];
  ListPunches: ListPunches;
  ListPunchesFilter: ListPunchesFilter;
  ListScheduleFilter: ListScheduleFilter;
  ListUsersFilter: ListUsersFilter;
  Mutation: {};
  Organization: Organization;
  Payroll: Payroll;
  Position: Position;
  PositionInput: PositionInput;
  Query: {};
  Schedule: Schedule;
  ScheduleAssigneeInput: ScheduleAssigneeInput;
  ScheduleAssignment: ScheduleAssignment;
  ScheduleInput: ScheduleInput;
  String: Scalars['String']['output'];
  UpdateOrganizationInput: UpdateOrganizationInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserSyncResult: UserSyncResult;
  ViewUserOptions: ViewUserOptions;
}>;

export type ClockTimeResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ClockTime'] = ResolversParentTypes['ClockTime']> = ResolversObject<{
  earning?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['ISODate']>, ParentType, ContextType>;
  hourlyWage?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  netHours?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  payroll?: Resolver<Maybe<ResolversTypes['Payroll']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export interface IsoDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISODate'], any> {
  name: 'ISODate';
}

export type ListPunchesResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ListPunches'] = ResolversParentTypes['ListPunches']> = ResolversObject<{
  active?: Resolver<Array<ResolversTypes['ClockTime']>, ParentType, ContextType>;
  history?: Resolver<Array<ResolversTypes['ClockTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  assignUserToSchedule?: Resolver<ResolversTypes['ScheduleAssignment'], ParentType, ContextType, RequireFields<MutationAssignUserToScheduleArgs, 'positionId' | 'scheduleId' | 'userId'>>;
  createOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  createPosition?: Resolver<ResolversTypes['Position'], ParentType, ContextType, RequireFields<MutationCreatePositionArgs, 'input'>>;
  createSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationCreateScheduleArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationDeleteScheduleArgs, 'scheduleId'>>;
  generatePayroll?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationGeneratePayrollArgs, 'options'>>;
  registerPunch?: Resolver<ResolversTypes['ClockTime'], ParentType, ContextType>;
  syncUsers?: Resolver<ResolversTypes['UserSyncResult'], ParentType, ContextType, Partial<MutationSyncUsersArgs>>;
  updateOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationUpdateOrganizationArgs, 'id' | 'input'>>;
  updateSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationUpdateScheduleArgs, 'input' | 'scheduleId'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input' | 'userId'>>;
}>;

export type OrganizationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  bannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  webUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PayrollResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Payroll'] = ResolversParentTypes['Payroll']> = ResolversObject<{
  clockTimes?: Resolver<Array<ResolversTypes['ClockTime']>, ParentType, ContextType>;
  deductions?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  dispensedOn?: Resolver<Maybe<ResolversTypes['ISODate']>, ParentType, ContextType>;
  employee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  generatedOn?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  netPay?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  periodEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  periodStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  totalHours?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hourlyWage?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['Schedule']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<QueryCurrentUserArgs>>;
  payrolls?: Resolver<Array<ResolversTypes['Payroll']>, ParentType, ContextType>;
  punches?: Resolver<ResolversTypes['ListPunches'], ParentType, ContextType, Partial<QueryPunchesArgs>>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<QueryScheduleArgs, 'id'>>;
  scheduledShifts?: Resolver<Array<ResolversTypes['ScheduleAssignment']>, ParentType, ContextType, Partial<QueryScheduledShiftsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type ScheduleResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  dateTimeEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  dateTimeStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  employees?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ScheduleAssignmentResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ScheduleAssignment'] = ResolversParentTypes['ScheduleAssignment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  addressL2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateJoined?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pincode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  positions?: Resolver<Maybe<Array<ResolversTypes['Position']>>, ParentType, ContextType>;
  profileIconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['ScheduleAssignment']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  syncStatus?: Resolver<Maybe<ResolversTypes['SyncStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserSyncResultResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['UserSyncResult'] = ResolversParentTypes['UserSyncResult']> = ResolversObject<{
  accepted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rejected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloServerContext> = ResolversObject<{
  ClockTime?: ClockTimeResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  ISODate?: GraphQLScalarType;
  ListPunches?: ListPunchesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Payroll?: PayrollResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  ScheduleAssignment?: ScheduleAssignmentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSyncResult?: UserSyncResultResolvers<ContextType>;
}>;

