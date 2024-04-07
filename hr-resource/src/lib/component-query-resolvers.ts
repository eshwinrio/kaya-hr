import { GraphQLError } from "graphql";
import { QueryResolvers } from "./gql-codegen/graphql.js";
import openWeatherMap from "./openweathermap.js";
import prisma from "./prisma.js";

export const qResolverPositionPicker: QueryResolvers["positionPicker"] = async (
  _root,
  _args,
  { organization }
) => {
  return await prisma.position.findMany({
    where: { organizationId: organization.id },
    include: { organization: true, User: true },
  });
}

export const qResolverWeatherData: QueryResolvers["weatherData"] = async (
  _root,
  { lat, lon },
  _context
) => {
  const currentConditions = await openWeatherMap
    .getCurrent({ coordinates: { lat, lon } })
    .then(data => data.weather)
    .catch(error => {
      throw new GraphQLError(`Failed to get weather data: ${error}`)
    });
  console.log(currentConditions);
  return currentConditions;
}
