// Get the current hostname of the page
const currentDomain = window.location.origin;

// Get the API domain from the environment variable or default to the current domain
const apiDomain = process.env.REACT_APP_AUTH_API_DOMAIN || currentDomain;

// Auth URI (prefixed)
const authUri = `${apiDomain}${process.env.REACT_APP_RESOURCE_API_PREFIX}`;

export const verifyIdentity = (requestInit?: RequestInit) => fetch(
  `${authUri}/auth/verify`,
  {
    method: 'GET',
    headers: {
      'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
    },
    credentials: 'include',
    ...requestInit
  }
);

export const fetchAccessToken = (username: string, password: string, requestInit?: RequestInit) => fetch(
  `${authUri}/auth/token`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
    ...requestInit
  }
);

export const signout = (requestInit?: RequestInit) => fetch(
  `${authUri}/auth/token`,
  {
    method: 'DELETE',
    headers: {
      'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
    },
    credentials: 'include',
    ...requestInit
  }
);

export const forgotPassword = (email: string, requestInit?: RequestInit) => fetch(
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/reset-password?email=${email}`,
  {
    method: 'GET',
    headers: {
      'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
    },
    ...requestInit
  }
);

export const resetPassword = (resetToken: string, password: string, requestInit?: RequestInit) => fetch(
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/reset-password?token=${resetToken}`,
  {
    method: 'POST',
    body: JSON.stringify({ password }),
    headers: {
      'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
      'Content-Type': 'application/json',
    },
    ...requestInit
  }
);

export const fetchWeather = async (lat: number, long: number, requestInit?: RequestInit) => {
  const url = new URL(process.env['REACT_APP_OPENWEATHERMAP_WEATHER_API']!);
  url.searchParams.append('lat', lat.toString());
  url.searchParams.append('lon', long.toString());
  url.searchParams.append('appid', process.env['REACT_APP_OPENWEATHERMAP_API_KEY']!);
  return fetch(url, { ...requestInit });
}
