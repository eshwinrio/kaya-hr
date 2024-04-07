import { ClockTime, Payslip } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "./dayjs.js";
import { Role } from "./gql-codegen/graphql.js";
import { ApolloServerContext } from "./apollo.js";
import { GraphQLError } from "graphql";

export function onlyAllow(this: ApolloServerContext, ...roles: Array<Role>) {
  if (!roles.some((role) => this.roles.includes(role))) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "ROLE_UNAUTHORIZED",
      },
    });
  }  
  return this;
}

export const clocktimeEarningReducer = (
  accumulator: Decimal,
  { startTime, endTime, hourlyWage }: ClockTime
) => accumulator.add(dayjs(endTime).diff(startTime, 'hour') * hourlyWage.toNumber());
