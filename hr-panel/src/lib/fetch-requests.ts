export const verifyIdentity = (requestInit?: RequestInit) => fetch(
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/verify`,
  { credentials: 'include', ...requestInit }
);

export const fetchAccessToken = (username: string, password: string) => fetch(
  `${process.env['REACT_APP_AUTH_API_DOMAIN']}/auth/token`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
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
