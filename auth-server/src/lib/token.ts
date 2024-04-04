import { Applications, Users } from "@prisma/client";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../config/environment.js";

export type AccessTokenPayload =
  JwtPayload
  & Pick<Users, 'id' | 'email' | 'firstName' | 'middleName' | 'lastName'>
  & Record<'application', Applications['secret']>;

export function generateAccessToken(
  { id, email, firstName, middleName, lastName }: Users,
  { secret }: Applications,
): string {
  const payload: AccessTokenPayload = {
    id, email, firstName, middleName, lastName,
    application: secret,
  };
  return jsonwebtoken.sign(payload, JWT.accessSecret, {
    expiresIn: JWT.accessValidity
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jsonwebtoken.verify(token, JWT.accessSecret) as AccessTokenPayload;
}
