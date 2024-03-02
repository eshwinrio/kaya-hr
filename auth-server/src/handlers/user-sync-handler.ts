import { Users } from "@prisma/client";
import { RequestHandler } from "express";
import validator from "validator";
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
    isValid &&= validator.isEmail(user.email);
    isValid &&= !validator.isEmpty(user.lastName) && validator.isAlpha(user.firstName);
    isValid &&= !user.middleName || validator.isAlpha(user.lastName);
    isValid &&= !validator.isEmpty(user.lastName) && validator.isAlpha(user.lastName);
    
    if (isValid) {
      const upsertedUserEmail = await prisma.users.upsert({
        where: { email: user.email },
        update: user,
        create: {...user, password: ''},
      }).then(document => document.email);
      accepted.push(upsertedUserEmail);
    } else {
      rejected.push(user.email);
    }
  }
  res.send({ accepted, rejected });
}

export default userSyncRequestHandler;
