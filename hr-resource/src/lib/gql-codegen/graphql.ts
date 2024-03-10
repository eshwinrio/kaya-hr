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

export type ListScheduleFilterInput = {
  createdByUserId?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['ISODate']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['ISODate']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganization: Organization;
  createPosition: Position;
  createSchedule: Schedule;
  createUser: User;
  deleteSchedule: Schedule;
  syncUsers: UserSyncResult;
  updateOrganization: Organization;
  updateSchedule: Schedule;
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
  scheduledShifts: Array<ScheduleAssignment>;
  user: User;
  users: Array<Maybe<User>>;
};


export type QueryScheduledShiftsArgs = {
  filters?: InputMaybe<ListScheduleFilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
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
  createdAt: Scalars['ISODate']['output'];
  createdBy?: Maybe<User>;
  dateTimeEnd: Scalars['ISODate']['output'];
  dateTimeStart: Scalars['ISODate']['output'];
  employees?: Maybe<Array<User>>;
  id: Scalars['Int']['output'];
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
  searchTerm?: InputMaybe<Scalars['String']['input']>;
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
  ISODate: ResolverTypeWrapper<Scalars['ISODate']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ListScheduleFilterInput: ListScheduleFilterInput;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
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
  Timesheet: ResolverTypeWrapper<Timesheet>;
  UpdateOrganizationInput: UpdateOrganizationInput;
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
  ISODate: Scalars['ISODate']['output'];
  Int: Scalars['Int']['output'];
  ListScheduleFilterInput: ListScheduleFilterInput;
  Mutation: {};
  Organization: Organization;
  Position: Position;
  PositionInput: PositionInput;
  Query: {};
  Schedule: Schedule;
  ScheduleAssigneeInput: ScheduleAssigneeInput;
  ScheduleAssignment: ScheduleAssignment;
  ScheduleInput: ScheduleInput;
  String: Scalars['String']['output'];
  Timesheet: Timesheet;
  UpdateOrganizationInput: UpdateOrganizationInput;
  User: User;
  UserSyncResult: UserSyncResult;
  ViewUserOptions: ViewUserOptions;
}>;

export type ClockTimeResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ClockTime'] = ResolversParentTypes['ClockTime']> = ResolversObject<{
  endTime?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  timesheetId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export interface IsoDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISODate'], any> {
  name: 'ISODate';
}

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  createPosition?: Resolver<ResolversTypes['Position'], ParentType, ContextType, RequireFields<MutationCreatePositionArgs, 'input'>>;
  createSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationCreateScheduleArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationDeleteScheduleArgs, 'scheduleId'>>;
  syncUsers?: Resolver<ResolversTypes['UserSyncResult'], ParentType, ContextType, Partial<MutationSyncUsersArgs>>;
  updateOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationUpdateOrganizationArgs, 'id' | 'input'>>;
  updateSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationUpdateScheduleArgs, 'input' | 'scheduleId'>>;
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

export type PositionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hourlyWage?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  scheduledShifts?: Resolver<Array<ResolversTypes['ScheduleAssignment']>, ParentType, ContextType, Partial<QueryScheduledShiftsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type ScheduleResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  dateTimeEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  dateTimeStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  employees?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  positions?: Resolver<Maybe<Array<ResolversTypes['Position']>>, ParentType, ContextType>;
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

export type TimesheetResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Timesheet'] = ResolversParentTypes['Timesheet']> = ResolversObject<{
  hourlyWage?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  timesheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timesheet']>>>, ParentType, ContextType>;
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
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  ScheduleAssignment?: ScheduleAssignmentResolvers<ContextType>;
  Timesheet?: TimesheetResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSyncResult?: UserSyncResultResolvers<ContextType>;
}>;

