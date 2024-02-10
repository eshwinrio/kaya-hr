import { Roles, Users } from "@prisma/client";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../config/environment.js";

export type AccessTokenPayload = JwtPayload & Partial<Users> & { roles: Roles[] };

export function generateAccessToken(
  { id, email, firstName, middleName, lastName }: Users,
  roles: Roles[]
): string {
  const payload: AccessTokenPayload = { id, email, firstName, middleName, lastName, roles };
  return jsonwebtoken.sign(payload, JWT.accessSecret, {
    expiresIn: JWT.accessValidity
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jsonwebtoken.verify(token, JWT.accessSecret) as AccessTokenPayload;
}
