import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { Organization, Role, User } from "@prisma/client";
import { readFileSync } from "fs";
import { GraphQLError } from "graphql";
import httpErrors, { HttpError } from "http-errors";
import { mResolverGeneratePayslips } from "./component-mutation-resolvers.js";
import { getHeaders, verifyIdentity } from "./fetch-requests.js";
import { Resolvers } from "./gql-codegen/graphql.js";
import { qResolverHRDashboardIndex } from "./hrdashboard-index-resolvers.js";
import { logHttp } from "./logger.js";
import { mResolverAssignUserToSchedule, mResolverCreateOrganization, mResolverCreateSchedule, mResolverCreateUser, mResolverDeleteSchedule, mResolverRegisterPunch, mResolverSyncUsers, mResolverUpdateOrganization, mResolverUpdateSchedule, mResolverUpdateUser } from "./mutation-resolvers.js";
import mGeneratePayslipResolver from "./page-mutation-resolvers.js";
import qResolverPayrollsIndex from "./payrolls-index-resolver.js";
import prisma from "./prisma.js";
import { qResolverCurrentUser, qResolverPayrollPeriods, qResolverPayrolls, qResolverPunches, qResolverSchedule, qResolverScheduledShifts, qResolverSchedules, qResolverUser, qResolverUsers } from "./query-resolvers.js";
import qResolverPositionPicker from "./resolvers/components/position-picker.js";
import qResolverWeatherData from "./resolvers/components/weather-widget.js";
import qResolverPayslipsIndex, { qResolverViewPayslip } from "./resolvers/pages/payslips/index.js";
import { Decimal, ISODate } from "./scalars.js";


export interface ApolloServerContext extends BaseContext {
  readonly user: User;
  readonly roles: Array<Role>;
  readonly organization: Organization;
  readonly applicationId: string;
  readonly accessToken: string;
}

export const apolloServerContextFn: ExpressMiddlewareOptions<ApolloServerContext>['context'] = async ({ req }) => {
  try {
    // Append all headers from the request to the headers object
    const headers = getHeaders(req);

    const verificationResponse = await verifyIdentity({ headers });
    if (!verificationResponse.ok) {
      const errorBody = await verificationResponse.json() as Error;
      throw httpErrors(verificationResponse.status, errorBody.message);
    }

    const responseBody = await verificationResponse.json() as { email: string, application: string };
    const mixedUserDocument = await prisma.user.findUnique({
      where: { email: responseBody.email },
      include: {
        organization: true,
        UserRoleMap: { select: { role: true } },
      },
    });

    if (!mixedUserDocument) {
      throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
    }

    const { organization, UserRoleMap, ...user } = mixedUserDocument;
    return {
      user,
      roles: UserRoleMap.map(({ role }) => role),
      organization,
      applicationId: responseBody.application,
      accessToken: req.cookies['access_token'],
    };
  } catch (error) {
    if (httpErrors.isHttpError(error)) {
      throw new GraphQLError((error as HttpError).message, { extensions: { code: (error as HttpError).statusCode } });
    }
    throw new GraphQLError((error as Error).message);
  }
};

const typeDefs = [
  readFileSync('graphql/schema.graphql', { encoding: 'utf-8' }),
  readFileSync('graphql/pages/payslips.graphql', { encoding: 'utf-8' }),
  readFileSync('graphql/openweathermap.graphql', { encoding: 'utf-8' }),
];

const resolvers: Resolvers<ApolloServerContext> = {
  Query: {
    currentUser: qResolverCurrentUser,
    hrDashboardIndex: qResolverHRDashboardIndex,
    users: qResolverUsers,
    user: qResolverUser,
    schedule: qResolverSchedule,
    schedules: qResolverSchedules,
    scheduledShifts: qResolverScheduledShifts,
    punches: qResolverPunches,
    payrollPeriods: qResolverPayrollPeriods,
    payrolls: qResolverPayrolls,
    payrollsIndex: qResolverPayrollsIndex,
    positionPicker: qResolverPositionPicker,
    payslipsIndex: qResolverPayslipsIndex,
    payslipsView: qResolverViewPayslip,
    weatherData: qResolverWeatherData,
  },
  Mutation: {
    createUser: mResolverCreateUser,
    updateUser: mResolverUpdateUser,
    createOrganization: mResolverCreateOrganization,
    updateOrganization: mResolverUpdateOrganization,
    syncUsers: mResolverSyncUsers,
    createSchedule: mResolverCreateSchedule,
    updateSchedule: mResolverUpdateSchedule,
    deleteSchedule: mResolverDeleteSchedule,
    registerPunch: mResolverRegisterPunch,
    assignUserToSchedule: mResolverAssignUserToSchedule,
    generatePayslips: mResolverGeneratePayslips,
    generateInvoice: mGeneratePayslipResolver,
  },
  Decimal: Decimal,
  ISODate: ISODate,
}

const apolloServerOptions: ApolloServerOptions<ApolloServerContext> = {
  typeDefs,
  resolvers,
  logger: logHttp,
};
const apolloServer = new ApolloServer(apolloServerOptions);

export default apolloServer;
