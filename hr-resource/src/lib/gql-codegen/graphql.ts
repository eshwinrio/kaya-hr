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

export type CurrentConditions = {
  __typename?: 'CurrentConditions';
  clouds: Scalars['Float']['output'];
  conditionId?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  dewPoint?: Maybe<Scalars['Int']['output']>;
  feelsLike: CurrentTemperatures;
  humidity: Scalars['Float']['output'];
  icon: Icon;
  main: Scalars['String']['output'];
  pressure: Scalars['Float']['output'];
  rain: Scalars['Float']['output'];
  snow: Scalars['Float']['output'];
  temp: CurrentTemperatures;
  uvi?: Maybe<Scalars['Int']['output']>;
  visibility: Scalars['Int']['output'];
  wind: WindData;
};

export type CurrentTemperatures = {
  __typename?: 'CurrentTemperatures';
  cur: Scalars['Float']['output'];
};

export type GeneratePayrollOptions = {
  employeeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodEnd: Scalars['ISODate']['input'];
  periodStart: Scalars['ISODate']['input'];
};

export type HrDashboardIndexPage = {
  __typename?: 'HRDashboardIndexPage';
  activeEmployees: Array<User>;
  employeeCount: Scalars['Int']['output'];
};

export type Icon = {
  __typename?: 'Icon';
  raw: Scalars['String']['output'];
  url: Scalars['String']['output'];
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
  netPay?: Maybe<Scalars['Decimal']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  paymentStatus: PaymentStatus;
};

export type PayslipsIndexPage = {
  __typename?: 'PayslipsIndexPage';
  currentPeriodPayslipCount: Scalars['Int']['output'];
  totalPayslipCount: Scalars['Int']['output'];
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
  hrDashboardIndex?: Maybe<HrDashboardIndexPage>;
  payrollPeriods?: Maybe<PayrollPeriod>;
  payrolls: Array<Payroll>;
  payrollsIndex: PayrollsIndex;
  payslipsIndex: PayslipsIndexPage;
  payslipsView: ViewPayslipPage;
  positionPicker: Array<Position>;
  punches: Array<ClockTime>;
  schedule: Schedule;
  scheduledShifts: Array<ScheduleAssignment>;
  schedules: Array<Schedule>;
  user: User;
  users: Array<User>;
  weatherData: CurrentConditions;
};


export type QueryCurrentUserArgs = {
  options?: InputMaybe<ViewUserOptions>;
};


export type QueryPayslipsViewArgs = {
  id: Scalars['Int']['input'];
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


export type QueryWeatherDataArgs = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
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

export type ViewPayslipPage = {
  __typename?: 'ViewPayslipPage';
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

export type ViewUserOptions = {
  scheduleFilters?: InputMaybe<ListScheduleFilter>;
};

export type WindData = {
  __typename?: 'WindData';
  deg: Scalars['Float']['output'];
  gust?: Maybe<Scalars['Float']['output']>;
  speed: Scalars['Float']['output'];
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
  CurrentConditions: ResolverTypeWrapper<CurrentConditions>;
  CurrentTemperatures: ResolverTypeWrapper<CurrentTemperatures>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeneratePayrollOptions: GeneratePayrollOptions;
  HRDashboardIndexPage: ResolverTypeWrapper<HrDashboardIndexPage>;
  ISODate: ResolverTypeWrapper<Scalars['ISODate']['output']>;
  Icon: ResolverTypeWrapper<Icon>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ListPunchesFilter: ListPunchesFilter;
  ListScheduleFilter: ListScheduleFilter;
  ListUsersFilter: ListUsersFilter;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  Pagination: Pagination;
  PaymentStatus: PaymentStatus;
  Payroll: ResolverTypeWrapper<Payroll>;
  PayrollPeriod: ResolverTypeWrapper<PayrollPeriod>;
  PayrollSummary: ResolverTypeWrapper<PayrollSummary>;
  PayrollsIndex: ResolverTypeWrapper<PayrollsIndex>;
  Payslip: ResolverTypeWrapper<Payslip>;
  PayslipsIndexPage: ResolverTypeWrapper<PayslipsIndexPage>;
  Position: ResolverTypeWrapper<Position>;
  PositionInput: PositionInput;
  PunchApprovalStatus: PunchApprovalStatus;
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
  ViewPayslipPage: ResolverTypeWrapper<ViewPayslipPage>;
  ViewUserOptions: ViewUserOptions;
  WindData: ResolverTypeWrapper<WindData>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  ClockTime: ClockTime;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateUserInput: CreateUserInput;
  CurrentConditions: CurrentConditions;
  CurrentTemperatures: CurrentTemperatures;
  Decimal: Scalars['Decimal']['output'];
  Float: Scalars['Float']['output'];
  GeneratePayrollOptions: GeneratePayrollOptions;
  HRDashboardIndexPage: HrDashboardIndexPage;
  ISODate: Scalars['ISODate']['output'];
  Icon: Icon;
  Int: Scalars['Int']['output'];
  ListPunchesFilter: ListPunchesFilter;
  ListScheduleFilter: ListScheduleFilter;
  ListUsersFilter: ListUsersFilter;
  Mutation: {};
  Organization: Organization;
  Pagination: Pagination;
  Payroll: Payroll;
  PayrollPeriod: PayrollPeriod;
  PayrollSummary: PayrollSummary;
  PayrollsIndex: PayrollsIndex;
  Payslip: Payslip;
  PayslipsIndexPage: PayslipsIndexPage;
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
  ViewPayslipPage: ViewPayslipPage;
  ViewUserOptions: ViewUserOptions;
  WindData: WindData;
}>;

export type ClockTimeResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ClockTime'] = ResolversParentTypes['ClockTime']> = ResolversObject<{
  approvalStatus?: Resolver<ResolversTypes['PunchApprovalStatus'], ParentType, ContextType>;
  earning?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['ISODate']>, ParentType, ContextType>;
  hourlyWage?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  netHours?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  payroll?: Resolver<Maybe<ResolversTypes['Payroll']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentConditionsResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['CurrentConditions'] = ResolversParentTypes['CurrentConditions']> = ResolversObject<{
  clouds?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  conditionId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dewPoint?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  feelsLike?: Resolver<ResolversTypes['CurrentTemperatures'], ParentType, ContextType>;
  humidity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['Icon'], ParentType, ContextType>;
  main?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pressure?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  snow?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  temp?: Resolver<ResolversTypes['CurrentTemperatures'], ParentType, ContextType>;
  uvi?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  wind?: Resolver<ResolversTypes['WindData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentTemperaturesResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['CurrentTemperatures'] = ResolversParentTypes['CurrentTemperatures']> = ResolversObject<{
  cur?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type HrDashboardIndexPageResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['HRDashboardIndexPage'] = ResolversParentTypes['HRDashboardIndexPage']> = ResolversObject<{
  activeEmployees?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  employeeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IsoDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISODate'], any> {
  name: 'ISODate';
}

export type IconResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Icon'] = ResolversParentTypes['Icon']> = ResolversObject<{
  raw?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  assignUserToSchedule?: Resolver<ResolversTypes['ScheduleAssignment'], ParentType, ContextType, RequireFields<MutationAssignUserToScheduleArgs, 'positionId' | 'scheduleId' | 'userId'>>;
  createOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  createPosition?: Resolver<ResolversTypes['Position'], ParentType, ContextType, RequireFields<MutationCreatePositionArgs, 'input'>>;
  createSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationCreateScheduleArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteSchedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<MutationDeleteScheduleArgs, 'scheduleId'>>;
  generateInvoice?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationGenerateInvoiceArgs, 'payslipId'>>;
  generatePayroll?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationGeneratePayrollArgs, 'options'>>;
  generatePayslips?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  generatedOn?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  netOutstanding?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  payslips?: Resolver<Maybe<Array<ResolversTypes['Payslip']>>, ParentType, ContextType>;
  periodEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  periodStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PayrollPeriodResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['PayrollPeriod'] = ResolversParentTypes['PayrollPeriod']> = ResolversObject<{
  endsOn?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  startsOn?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PayrollSummaryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['PayrollSummary'] = ResolversParentTypes['PayrollSummary']> = ResolversObject<{
  completedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payrollId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pendingTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  periodEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  periodStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  rejectedTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalTasks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PayrollsIndexResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['PayrollsIndex'] = ResolversParentTypes['PayrollsIndex']> = ResolversObject<{
  activePayslips?: Resolver<Array<ResolversTypes['Payslip']>, ParentType, ContextType>;
  amountOutstanding?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  currentCycleEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  currentCycleStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  currentPayrollSummary?: Resolver<Maybe<ResolversTypes['PayrollSummary']>, ParentType, ContextType>;
  previousPayrolls?: Resolver<Array<ResolversTypes['Payroll']>, ParentType, ContextType>;
  week?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PayslipResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Payslip'] = ResolversParentTypes['Payslip']> = ResolversObject<{
  clockTimes?: Resolver<Maybe<Array<ResolversTypes['ClockTime']>>, ParentType, ContextType>;
  deductions?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  dispensedOn?: Resolver<Maybe<ResolversTypes['ISODate']>, ParentType, ContextType>;
  employee?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  generatedOn?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  netPay?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PayslipsIndexPageResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['PayslipsIndexPage'] = ResolversParentTypes['PayslipsIndexPage']> = ResolversObject<{
  currentPeriodPayslipCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPayslipCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hourlyWage?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['Schedule']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<QueryCurrentUserArgs>>;
  hrDashboardIndex?: Resolver<Maybe<ResolversTypes['HRDashboardIndexPage']>, ParentType, ContextType>;
  payrollPeriods?: Resolver<Maybe<ResolversTypes['PayrollPeriod']>, ParentType, ContextType>;
  payrolls?: Resolver<Array<ResolversTypes['Payroll']>, ParentType, ContextType>;
  payrollsIndex?: Resolver<ResolversTypes['PayrollsIndex'], ParentType, ContextType>;
  payslipsIndex?: Resolver<ResolversTypes['PayslipsIndexPage'], ParentType, ContextType>;
  payslipsView?: Resolver<ResolversTypes['ViewPayslipPage'], ParentType, ContextType, RequireFields<QueryPayslipsViewArgs, 'id'>>;
  positionPicker?: Resolver<Array<ResolversTypes['Position']>, ParentType, ContextType>;
  punches?: Resolver<Array<ResolversTypes['ClockTime']>, ParentType, ContextType, Partial<QueryPunchesArgs>>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, RequireFields<QueryScheduleArgs, 'id'>>;
  scheduledShifts?: Resolver<Array<ResolversTypes['ScheduleAssignment']>, ParentType, ContextType, Partial<QueryScheduledShiftsArgs>>;
  schedules?: Resolver<Array<ResolversTypes['Schedule']>, ParentType, ContextType, Partial<QuerySchedulesArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  weatherData?: Resolver<ResolversTypes['CurrentConditions'], ParentType, ContextType, RequireFields<QueryWeatherDataArgs, 'lat' | 'lon'>>;
}>;

export type ScheduleResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  dateTimeEnd?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  dateTimeStart?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type ViewPayslipPageResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['ViewPayslipPage'] = ResolversParentTypes['ViewPayslipPage']> = ResolversObject<{
  clockTimes?: Resolver<Array<ResolversTypes['ClockTime']>, ParentType, ContextType>;
  deductions?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  dispensedOn?: Resolver<Maybe<ResolversTypes['ISODate']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  generatedOn?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invoiceUuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  netPay?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WindDataResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['WindData'] = ResolversParentTypes['WindData']> = ResolversObject<{
  deg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  gust?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloServerContext> = ResolversObject<{
  ClockTime?: ClockTimeResolvers<ContextType>;
  CurrentConditions?: CurrentConditionsResolvers<ContextType>;
  CurrentTemperatures?: CurrentTemperaturesResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  HRDashboardIndexPage?: HrDashboardIndexPageResolvers<ContextType>;
  ISODate?: GraphQLScalarType;
  Icon?: IconResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Payroll?: PayrollResolvers<ContextType>;
  PayrollPeriod?: PayrollPeriodResolvers<ContextType>;
  PayrollSummary?: PayrollSummaryResolvers<ContextType>;
  PayrollsIndex?: PayrollsIndexResolvers<ContextType>;
  Payslip?: PayslipResolvers<ContextType>;
  PayslipsIndexPage?: PayslipsIndexPageResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  ScheduleAssignment?: ScheduleAssignmentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSyncResult?: UserSyncResultResolvers<ContextType>;
  ViewPayslipPage?: ViewPayslipPageResolvers<ContextType>;
  WindData?: WindDataResolvers<ContextType>;
}>;

