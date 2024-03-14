export const verifyIdentity = (requestInit?: RequestInit) => fetch(
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/verify`,
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
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/token`,
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
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/token`,
  {
    method: 'DELETE',
    headers: {
      'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
    },
    credentials: 'include',
    ...requestInit
  }
);
