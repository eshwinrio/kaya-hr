import { OpenWeatherAPI } from "openweather-api-node";
import { OpenWeatherMap as OpenWeatherMapConfig } from "../config/environment.js";

const openWeatherMap = new OpenWeatherAPI({
  key: OpenWeatherMapConfig.apiKey,
});

export default openWeatherMap;
