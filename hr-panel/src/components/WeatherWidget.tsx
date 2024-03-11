import { PaperProps } from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { alpha } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import { fetchWeather } from "../lib/fetch-requests";
import DashCard from "./DashCard";

interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherWidgetProps extends PaperProps {

}

const WeatherWidget: FC<WeatherWidgetProps> = function ({ children, ...props }) {
  const [geolocationPos, setGeoLocationPos] = useState<GeolocationPosition>();
  const [weatherData, setWeatherData] = useState<OpenWeatherMapResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError>();
  const [fetchError, setFetchError] = useState<string>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => setGeoLocationPos(position),
      error => setError(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (!geolocationPos) {
      setLoading(false);
      return;
    }
    if (geolocationPos) {
      fetchWeather(geolocationPos.coords.latitude, geolocationPos.coords.longitude)
        .then(response => response.json())
        .then(json => setWeatherData(json))
        .catch(error => setFetchError(error.message))
        .finally(() => setLoading(false));
    }
  }, [geolocationPos]);

  if (!navigator.geolocation || error || fetchError) {
    return <></>;
  }

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  if (weatherData) {
    return (
      <DashCard sx={({ palette }) => ({
        backgroundImage: `url(https://source.unsplash.com/random/1600x900?${palette.mode === 'dark' ? 'night' : 'day'},${weatherData.weather[0].description.split(' ').join(',')})`,
        backgroundPosition: 'bottom',
        color: palette.common.white,
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundImage: `linear-gradient(45deg, ${alpha(palette.grey[900], 0.7)}, ${alpha(palette.grey[700], 0.1)})`,
        },
      })}>
        <Grid2 container justifyContent='flex-start' alignItems='center' position='inherit'>
          <Grid2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather"
              width={64} height={64}
            />
          </Grid2>
          <Grid2>
            <Typography variant="h3" fontWeight={600}>
              {Math.round(Math.floor((weatherData.main.temp - 273.15) * 100) / 100)}°
            </Typography>
          </Grid2>
          <Grid2 xs={12} sx={{ pl: 8 }}>
            <Typography variant="body2" fontWeight={600}>{weatherData.weather[0].main}</Typography>
          </Grid2>
        </Grid2>
        <Typography align="right" fontStyle='italic' fontSize='0.5rem'>Image fetched from <a href="https://unsplash.com/">Unsplash</a></Typography>
      </DashCard >
    )
  } else {
    return <></>;
  }
}

export default WeatherWidget;
