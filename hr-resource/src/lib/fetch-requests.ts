import { Api } from "../config/environment.js";

export const verifyIdentity = (requestInit: RequestInit) => fetch(
  `${Api.authDomain.href}auth/verify`,
  { method: 'GET', ...requestInit }
);
