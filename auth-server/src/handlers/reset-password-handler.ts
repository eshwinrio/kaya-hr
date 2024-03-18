import { RequestHandler } from "express";
import { Bcrypt, JWT } from "../config/environment.js";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { hash } from "bcrypt";
import httpErrors from "http-errors";
import createHttpError from "http-errors";

export interface ReqBody {
  readonly password: string;
}
export type ReqQuery = Record<'token', string>;
export type ResetPasswordRequestHandler = RequestHandler<unknown, unknown, ReqBody, ReqQuery>;

const resetPasswordRequestHandler: ResetPasswordRequestHandler = async (req, res, next) => {
  const { token: resetToken } = req.query;
  const { password } = req.body;
  try {
    const decoded = jsonwebtoken.verify(resetToken, JWT.accessSecret) as { email: string };
    const { email } = decoded;
    
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new createHttpError.NotFound('User not found');
    }

    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        password: await hash(password, Bcrypt.saltRounds)
      }
    });

    res.sendStatus(200);
  } catch (error) {
    if (error instanceof jsonwebtoken.TokenExpiredError) {
      next(httpErrors.Unauthorized('Token expired'));
    } else {
      next(error);
    }
  }
}

export default resetPasswordRequestHandler;
