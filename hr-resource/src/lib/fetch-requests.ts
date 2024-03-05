import { User } from "@prisma/client";
import { Api } from "../config/environment.js";
import type { Request } from 'express';

export const getHeaders = (req: Request) => {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (key.match(/^content-length$/i)) continue;
    headers.append(key, Array.isArray(value) ? value.join(',') : value);
  }

  return headers;
}

export const verifyIdentity = (requestInit: RequestInit) => fetch(
  `${Api.authDomain.href}auth/verify`,
  { method: 'GET', ...requestInit }
);

export const syncUsers = (
  body: Array<Pick<User, 'firstName' | 'middleName' | 'lastName' | 'email'> | Record<'password', string>>,
  force = false,
  requestInit?: RequestInit
) => fetch(
  `${Api.authDomain.href}users/sync?force=${force}`,
  { method: 'POST', body: JSON.stringify({ data: body }), ...requestInit }
);
