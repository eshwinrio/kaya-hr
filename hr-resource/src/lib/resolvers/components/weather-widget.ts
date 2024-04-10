import { GraphQLError } from "graphql";
import { QueryResolvers } from "../../gql-codegen/graphql.js";
import openWeatherMap from "../../openweathermap.js";

const qResolverWeatherData: QueryResolvers["weatherData"] = async (
  _root,
  { lat, lon },
  _context
) => await openWeatherMap
  .getCurrent({ coordinates: { lat, lon } })
  .then(data => data.weather)
  .catch(error => {
    throw new GraphQLError(`Failed to get weather data: ${error}`)
  });

export default qResolverWeatherData;
