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
    "\n  fragment ActivePayslipsCard on PayrollsIndex {\n    activePayslips {\n      id\n      ...PayslipListItem\n    }\n  }\n": types.ActivePayslipsCardFragmentDoc,
    "\n  mutation ActivePayslipsActionGenerate {\n    generatePayslips\n  }\n": types.ActivePayslipsActionGenerateDocument,
    "\n  fragment OutstandingAmountCard on PayrollsIndex {\n    amountOutstanding\n    previousPayrolls {\n      id\n      generatedOn\n      netOutstanding\n    }\n  }\n": types.OutstandingAmountCardFragmentDoc,
    "\n  fragment PayrollSummaryCard on PayrollSummary {\n    payrollId\n    periodStart\n    periodEnd\n    totalTasks\n    pendingTasks\n    completedTasks\n    rejectedTasks\n  }\n": types.PayrollSummaryCardFragmentDoc,
    "\n  fragment PayslipListItem on Payslip {\n    id\n    netPay\n    deductions\n    paymentMethod\n    generatedOn\n    employee {\n      id\n      firstName\n      lastName\n      email\n      ...Avatar\n    }\n  }\n": types.PayslipListItemFragmentDoc,
    "\n  fragment ScheduleListItem on Schedule {\n    id\n    title\n    description\n    dateTimeStart\n    dateTimeEnd\n    employees { firstName }\n    createdBy { ...Avatar }\n    createdAt\n  }\n": types.ScheduleListItemFragmentDoc,
    "\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n": types.AvatarFragmentDoc,
    "\n  fragment UserListItem on User {\n    id\n    firstName\n    lastName\n    email\n    ...Avatar\n  }\n": types.UserListItemFragmentDoc,
    "\n  query WhoAmI {\n    currentUser {\n      id\n      email\n      phone\n      firstName\n      middleName\n      lastName\n      streetName\n      city\n      country\n      province\n      pincode\n      dateOfBirth\n      dateJoined\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      dateJoined\n      positions {\n        id\n        title\n        description\n      }\n      profileIconUrl\n      bannerUrl\n    }\n  }\n": types.WhoAmIDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {\n    updateOrganization(id: $id, input: $input) {\n      id\n      name\n      summary\n      webUrl\n      logoUrl\n      bannerUrl\n    }\n  }\n": types.UpdateOrganizationDocument,
    "\n  query LoadAllUsers ($options: ListUsersFilter) {\n    users (options: $options) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n      streetName\n      pincode\n      syncStatus\n      positions {\n        id\n        title\n      }\n    }\n  }\n": types.LoadAllUsersDocument,
    "\n  mutation SyncUsers($force: Boolean) {\n    syncUsers(force: $force) {\n      accepted\n      rejected\n    }\n  }\n": types.SyncUsersDocument,
    "\n  query ListUserSchedules ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n": types.ListUserSchedulesDocument,
    "\n  query ViewUser ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      streetName\n      addressL2\n      city\n      country\n      province\n      pincode\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n    }\n  }\n": types.ViewUserDocument,
    "\n  mutation UpdateUser($userId: Int!, $input: UpdateUserInput!) {\n    updateUser(userId: $userId, input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query ListAllSchedules ($filters: ListScheduleFilter) {\n    scheduledShifts (filters: $filters) {\n      id\n      schedule {\n        id\n        title\n        dateTimeStart\n        dateTimeEnd\n        createdBy {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n          profileIconUrl\n          bannerUrl\n        }\n        createdAt\n      }\n      user {\n        id\n        email\n        firstName\n        lastName\n        streetName\n        city\n        country\n        province\n        pincode\n        dateOfBirth\n        dateJoined\n        phone\n        profileIconUrl\n        bannerUrl\n      }\n      position {\n        id\n        title\n        description\n        hourlyWage\n      }\n    }\n  }\n": types.ListAllSchedulesDocument,
    "\n  mutation CreateSchedule($input: ScheduleInput!) {\n    createSchedule(input: $input) {\n      id\n      title\n      dateTimeStart\n      dateTimeEnd\n      employees {\n        id\n        email\n        positions {\n          title\n        }\n      }\n    }\n  }\n": types.CreateScheduleDocument,
    "\n  query ActiveUsers {\n    punches(filter: { activeOnly: true }) {\n      id\n      user { ...UserListItem }\n    }\n  }\n": types.ActiveUsersDocument,
    "\n  query PayrollsIndex {\n    payrollsIndex {\n      week\n      year\n      currentCycleStart\n      currentCycleEnd\n      currentPayrollSummary {\n        ...PayrollSummaryCard\n      }\n      ...OutstandingAmountCard\n      ...ActivePayslipsCard\n    }\n  }\n": types.PayrollsIndexDocument,
    "\n  query SchedulesViewer($filters: ListScheduleFilter) {\n    schedules(filters: $filters) {\n      id\n      ...ScheduleListItem\n    }\n  }\n": types.SchedulesViewerDocument,
    "\n  query ViewEmployee ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      ...Avatar\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n": types.ViewEmployeeDocument,
    "\n  query PickUserDialog($options: ListUsersFilter!) {\n    users(options: $options) {\n      id\n      firstName\n      lastName\n      email\n      ...Avatar\n    }\n  }\n": types.PickUserDialogDocument,
    "\n  query PositionPicker {\n    positionPicker {\n      id\n      title\n      description\n      hourlyWage\n      users {\n        ...Avatar\n      }\n    }\n  }\n": types.PositionPickerDocument,
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
export function gql(source: "\n  fragment ActivePayslipsCard on PayrollsIndex {\n    activePayslips {\n      id\n      ...PayslipListItem\n    }\n  }\n"): (typeof documents)["\n  fragment ActivePayslipsCard on PayrollsIndex {\n    activePayslips {\n      id\n      ...PayslipListItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ActivePayslipsActionGenerate {\n    generatePayslips\n  }\n"): (typeof documents)["\n  mutation ActivePayslipsActionGenerate {\n    generatePayslips\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OutstandingAmountCard on PayrollsIndex {\n    amountOutstanding\n    previousPayrolls {\n      id\n      generatedOn\n      netOutstanding\n    }\n  }\n"): (typeof documents)["\n  fragment OutstandingAmountCard on PayrollsIndex {\n    amountOutstanding\n    previousPayrolls {\n      id\n      generatedOn\n      netOutstanding\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PayrollSummaryCard on PayrollSummary {\n    payrollId\n    periodStart\n    periodEnd\n    totalTasks\n    pendingTasks\n    completedTasks\n    rejectedTasks\n  }\n"): (typeof documents)["\n  fragment PayrollSummaryCard on PayrollSummary {\n    payrollId\n    periodStart\n    periodEnd\n    totalTasks\n    pendingTasks\n    completedTasks\n    rejectedTasks\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PayslipListItem on Payslip {\n    id\n    netPay\n    deductions\n    paymentMethod\n    generatedOn\n    employee {\n      id\n      firstName\n      lastName\n      email\n      ...Avatar\n    }\n  }\n"): (typeof documents)["\n  fragment PayslipListItem on Payslip {\n    id\n    netPay\n    deductions\n    paymentMethod\n    generatedOn\n    employee {\n      id\n      firstName\n      lastName\n      email\n      ...Avatar\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ScheduleListItem on Schedule {\n    id\n    title\n    description\n    dateTimeStart\n    dateTimeEnd\n    employees { firstName }\n    createdBy { ...Avatar }\n    createdAt\n  }\n"): (typeof documents)["\n  fragment ScheduleListItem on Schedule {\n    id\n    title\n    description\n    dateTimeStart\n    dateTimeEnd\n    employees { firstName }\n    createdBy { ...Avatar }\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n"): (typeof documents)["\n  fragment Avatar on User {\n    profileIconUrl\n    firstName\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserListItem on User {\n    id\n    firstName\n    lastName\n    email\n    ...Avatar\n  }\n"): (typeof documents)["\n  fragment UserListItem on User {\n    id\n    firstName\n    lastName\n    email\n    ...Avatar\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query WhoAmI {\n    currentUser {\n      id\n      email\n      phone\n      firstName\n      middleName\n      lastName\n      streetName\n      city\n      country\n      province\n      pincode\n      dateOfBirth\n      dateJoined\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      dateJoined\n      positions {\n        id\n        title\n        description\n      }\n      profileIconUrl\n      bannerUrl\n    }\n  }\n"): (typeof documents)["\n  query WhoAmI {\n    currentUser {\n      id\n      email\n      phone\n      firstName\n      middleName\n      lastName\n      streetName\n      city\n      country\n      province\n      pincode\n      dateOfBirth\n      dateJoined\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      dateJoined\n      positions {\n        id\n        title\n        description\n      }\n      profileIconUrl\n      bannerUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      firstName\n      middleName\n      lastName\n      dateOfBirth\n      email\n      streetName\n      addressL2\n      city\n      pincode\n      province\n      phone\n      country\n      dateJoined\n      status\n      syncStatus\n      profileIconUrl\n      bannerUrl\n      organization {\n        id\n        name\n        summary\n        webUrl\n        logoUrl\n        bannerUrl\n      }\n      roles\n      positions {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {\n    updateOrganization(id: $id, input: $input) {\n      id\n      name\n      summary\n      webUrl\n      logoUrl\n      bannerUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganization($id: Int!, $input: UpdateOrganizationInput!) {\n    updateOrganization(id: $id, input: $input) {\n      id\n      name\n      summary\n      webUrl\n      logoUrl\n      bannerUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LoadAllUsers ($options: ListUsersFilter) {\n    users (options: $options) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n      streetName\n      pincode\n      syncStatus\n      positions {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query LoadAllUsers ($options: ListUsersFilter) {\n    users (options: $options) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      profileIconUrl\n      bannerUrl\n      dateOfBirth\n      dateJoined\n      streetName\n      pincode\n      syncStatus\n      positions {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SyncUsers($force: Boolean) {\n    syncUsers(force: $force) {\n      accepted\n      rejected\n    }\n  }\n"): (typeof documents)["\n  mutation SyncUsers($force: Boolean) {\n    syncUsers(force: $force) {\n      accepted\n      rejected\n    }\n  }\n"];
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
export function gql(source: "\n  query ListAllSchedules ($filters: ListScheduleFilter) {\n    scheduledShifts (filters: $filters) {\n      id\n      schedule {\n        id\n        title\n        dateTimeStart\n        dateTimeEnd\n        createdBy {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n          profileIconUrl\n          bannerUrl\n        }\n        createdAt\n      }\n      user {\n        id\n        email\n        firstName\n        lastName\n        streetName\n        city\n        country\n        province\n        pincode\n        dateOfBirth\n        dateJoined\n        phone\n        profileIconUrl\n        bannerUrl\n      }\n      position {\n        id\n        title\n        description\n        hourlyWage\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListAllSchedules ($filters: ListScheduleFilter) {\n    scheduledShifts (filters: $filters) {\n      id\n      schedule {\n        id\n        title\n        dateTimeStart\n        dateTimeEnd\n        createdBy {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n          profileIconUrl\n          bannerUrl\n        }\n        createdAt\n      }\n      user {\n        id\n        email\n        firstName\n        lastName\n        streetName\n        city\n        country\n        province\n        pincode\n        dateOfBirth\n        dateJoined\n        phone\n        profileIconUrl\n        bannerUrl\n      }\n      position {\n        id\n        title\n        description\n        hourlyWage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSchedule($input: ScheduleInput!) {\n    createSchedule(input: $input) {\n      id\n      title\n      dateTimeStart\n      dateTimeEnd\n      employees {\n        id\n        email\n        positions {\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSchedule($input: ScheduleInput!) {\n    createSchedule(input: $input) {\n      id\n      title\n      dateTimeStart\n      dateTimeEnd\n      employees {\n        id\n        email\n        positions {\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ActiveUsers {\n    punches(filter: { activeOnly: true }) {\n      id\n      user { ...UserListItem }\n    }\n  }\n"): (typeof documents)["\n  query ActiveUsers {\n    punches(filter: { activeOnly: true }) {\n      id\n      user { ...UserListItem }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PayrollsIndex {\n    payrollsIndex {\n      week\n      year\n      currentCycleStart\n      currentCycleEnd\n      currentPayrollSummary {\n        ...PayrollSummaryCard\n      }\n      ...OutstandingAmountCard\n      ...ActivePayslipsCard\n    }\n  }\n"): (typeof documents)["\n  query PayrollsIndex {\n    payrollsIndex {\n      week\n      year\n      currentCycleStart\n      currentCycleEnd\n      currentPayrollSummary {\n        ...PayrollSummaryCard\n      }\n      ...OutstandingAmountCard\n      ...ActivePayslipsCard\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SchedulesViewer($filters: ListScheduleFilter) {\n    schedules(filters: $filters) {\n      id\n      ...ScheduleListItem\n    }\n  }\n"): (typeof documents)["\n  query SchedulesViewer($filters: ListScheduleFilter) {\n    schedules(filters: $filters) {\n      id\n      ...ScheduleListItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ViewEmployee ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      ...Avatar\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ViewEmployee ($userId: Int!) {\n    user(id: $userId) {\n      id\n      firstName\n      middleName\n      lastName\n      email\n      phone\n      city\n      country\n      province\n      roles\n      ...Avatar\n      bannerUrl\n      schedules {\n        id\n        position {\n          id\n          title\n          description\n          hourlyWage\n        }\n        schedule {\n          id\n          title\n          dateTimeStart\n          dateTimeEnd\n          createdBy {\n            id\n            email\n            firstName\n            lastName\n            streetName\n            city\n            country\n            province\n            pincode\n            dateOfBirth\n            dateJoined\n            phone\n          }\n          createdAt\n        }\n        user {\n          id\n          email\n          firstName\n          lastName\n          streetName\n          city\n          country\n          province\n          pincode\n          dateOfBirth\n          dateJoined\n          phone\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PickUserDialog($options: ListUsersFilter!) {\n    users(options: $options) {\n      id\n      firstName\n      lastName\n      email\n      ...Avatar\n    }\n  }\n"): (typeof documents)["\n  query PickUserDialog($options: ListUsersFilter!) {\n    users(options: $options) {\n      id\n      firstName\n      lastName\n      email\n      ...Avatar\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PositionPicker {\n    positionPicker {\n      id\n      title\n      description\n      hourlyWage\n      users {\n        ...Avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query PositionPicker {\n    positionPicker {\n      id\n      title\n      description\n      hourlyWage\n      users {\n        ...Avatar\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;