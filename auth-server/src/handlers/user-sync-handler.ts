import { Users } from "@prisma/client";
import { hash } from "bcrypt";
import { RequestHandler } from "express";
import validator from "validator";
import { Bcrypt } from "../config/environment.js";
import { logSystem } from "../lib/logger.js";
import prisma from "../lib/prisma.js";

export type ResBody = Record<'accepted', Array<string>> & Record<'rejected', Array<string>>;
export type ReqBody = Record<'data', Array<Users>>;
export type ReqQuery = qs.ParsedQs & Record<string, unknown>;
export type UserSyncRequestHandler = RequestHandler<unknown, ResBody, ReqBody, ReqQuery>;

const userSyncRequestHandler: UserSyncRequestHandler = async (req, res) => {
  const { data } = req.body;
  const accepted: Array<string> = [];
  const rejected: Array<string> = [];
  for (const user of data) {
    let isValid = true;
    const { password, ...rest } = user;
    isValid &&= validator.isEmail(rest.email);
    isValid &&= !validator.isEmpty(rest.lastName) && validator.isAlpha(rest.firstName);
    isValid &&= !rest.middleName || validator.isAlpha(rest.lastName);
    isValid &&= !validator.isEmpty(rest.lastName) && validator.isAlpha(rest.lastName);
    
    if (isValid) {
      const hashedPassword = password ? await hash(password, Bcrypt.saltRounds) : '';
      const upsertedUserEmail = await prisma.users
        .upsert({
        where: { email: rest.email },
        update: rest,
        create: {...rest, password: hashedPassword },
      })
      .then(document => document.email)
      .catch(error => {
        logSystem.error(error);
        throw error;
      })
      accepted.push(upsertedUserEmail);
    } else {
      rejected.push(rest.email);
    }
  }
  res.send({ accepted, rejected });
}

export default userSyncRequestHandler;
