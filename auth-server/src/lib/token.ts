import { Applications, Roles, Users } from "@prisma/client";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../config/environment.js";

export type AccessTokenPayload =
  JwtPayload
  & Pick<Users, 'id' | 'email' | 'firstName' | 'middleName' | 'lastName'>
  & Record<'application', Applications['secret']>
  & Record<'roles', Roles[]>;

export function generateAccessToken(
  { id, email, firstName, middleName, lastName }: Users,
  { secret }: Applications,
  roles: Roles[]
): string {
  const payload: AccessTokenPayload = {
    id, email, firstName, middleName, lastName,
    application: secret,
    roles
  };
  return jsonwebtoken.sign(payload, JWT.accessSecret, {
    expiresIn: JWT.accessValidity
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jsonwebtoken.verify(token, JWT.accessSecret) as AccessTokenPayload;
}
