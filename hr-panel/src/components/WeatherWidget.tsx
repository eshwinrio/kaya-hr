import { PaperProps } from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { alpha } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import DashCard from "./DashCard";
import { gql, useLazyQuery } from "@apollo/client";
import Alert from "@mui/material/Alert";

const query = gql(`
  query WeatherWidget($lat: Float!, $lon: Float!) {
    weatherData(lat: $lat, lon: $lon) {
      temp {
        cur
      }
      feelsLike {
        cur
      }
      pressure
      humidity
      dewPoint
      clouds
      uvi
      visibility
      wind {
        speed
        gust
        deg
      }
      rain
      snow
      conditionId
      main
      description
      icon {
        url
        raw
      }
    }
  }
`);

interface WeatherWidgetProps extends PaperProps { }

const WeatherWidget: FC<WeatherWidgetProps> = function ({ children, ...props }) {
  const [geolocationPos, setGeoLocationPos] = useState<GeolocationPosition>();
  const [geolocationPosError, setGeoLocationPosError] = useState<GeolocationPositionError>();
  const [fetchWeather, { data, loading, error }] = useLazyQuery(query);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setGeoLocationPos(position);
        fetchWeather({ variables: { lat: position.coords.latitude, lon: position.coords.longitude } });
      },
      error => setGeoLocationPosError(error),
      { enableHighAccuracy: true }
    );
  }, [fetchWeather]);

  if (loading || !geolocationPos) {
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        width="100%" height={120}
      />
    );
  } else if (geolocationPosError) {
    return (
      <Alert severity="warning" >
        Weather service is not available.<br />
        <Typography variant="caption">Error: {geolocationPosError.message}</Typography>
      </Alert>
    );
  } else if (error) {
    return (
      <Alert severity="error" >
        Weather service is not available.<br />
        <Typography variant="caption">Error: {error.message}</Typography>
      </Alert>
    );
  }

  if (!data) return null;

  const weatherData = data.weatherData;
  if (!weatherData) return null;

  return (
    <DashCard sx={({ palette }) => ({
      backgroundImage: `url(https://source.unsplash.com/random/1600x900?${palette.mode === 'dark' ? 'night' : 'day'},${weatherData.description.split(' ').join(',')})`,
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
            src={weatherData.icon.url}
            alt="weather"
            width={64} height={64}
          />
        </Grid2>
        <Grid2>
          <Typography variant="h3" fontWeight={600}>
            {Math.round(Math.floor((weatherData.temp.cur - 273.15) * 100) / 100)}°
          </Typography>
        </Grid2>
        <Grid2 xs={12} sx={{ pl: 8 }}>
          <Typography variant="body2" fontWeight={600}>{weatherData.main}</Typography>
        </Grid2>
      </Grid2>
      <Typography align="right" fontStyle='italic' fontSize='0.5rem'>Image fetched from <a href="https://unsplash.com/">Unsplash</a></Typography>
    </DashCard >
  );
}

export default WeatherWidget;
