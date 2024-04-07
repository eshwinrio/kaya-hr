import { QueryResolvers, Role, SyncStatus } from './gql-codegen/graphql.js';
import { OpenWeatherAPI } from 'openweather-api-node';
import { onlyAllow } from './utilities.js';
import prisma from './prisma.js';
import { OpenWeatherMap } from '../config/environment.js';
import openWeatherMap from './openweathermap.js';

export const qResolverHRDashboardIndex: QueryResolvers['hrDashboardIndex'] = async (
  _parent,
  _args,
  context,
  _info
) => {
  onlyAllow.bind(context)(Role.Manager, Role.Admin);

  // Employee Count
  const employeeCount = await prisma.user.count({
    where: {
      UserRoleMap: {
        some: {
          role: Role.Employee
        }
      },
      organizationId: context.organization.id,
    },
  });

  // Active Employees
  const activeEmployees = await prisma.user.findMany({
    where: {
      organizationId: context.organization.id,
      ClockTime: {
        some: { endTime: null }
      },
    },
    include: {
      UserRoleMap: true
    }
  }).then(users => users.map(({ syncStatus, ...user }) => ({
    ...user,
    syncStatus: syncStatus as SyncStatus
  })));

  return {
    activeEmployees,
    employeeCount,
  };
}
