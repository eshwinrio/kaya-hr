import { RequestHandler } from "express";
import { transporter } from "../lib/nodemailer.js";
import { Api, Bcrypt, JWT, Nodemailer } from "../config/environment.js";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { hash } from "bcrypt";
import httpErrors from "http-errors";

export interface ReqBody {
  readonly token: string;
  readonly password: string;
}
export type ResetPasswordRequestHandler = RequestHandler<unknown, unknown, ReqBody>;

const resetPasswordRequestHandler: ResetPasswordRequestHandler = async (req, res, next) => {
  const { password, token } = req.body;
  try {
    const decoded = jsonwebtoken.verify(token, JWT.accessSecret) as { email: string };
    const { email } = decoded;
    
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error('User not found');
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
