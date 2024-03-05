import { hash } from "bcrypt";
import { Router } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";
import validator from "validator";
import { Bcrypt } from "../config/environment.js";
import userSyncRequestHandler, { ReqBody as UserSyncBody } from "../handlers/user-sync-handler.js";
import prisma from "../lib/prisma.js";
import requireAccessToken from "../middlewares/require-access-token.js";
import requireApplication from "../middlewares/require-application.js";
import requireBody from "../middlewares/require-body.js";
import requireUser from "../middlewares/require-user.js";
import requireUserApplicationLink from "../middlewares/require-userApplication-link.js";

const userRouter = Router();

interface CreateUserBody {
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}
type UserCreateRequiredBodyKeys = "firstName" | "lastName" | "email" | "password";
userRouter.post( 
  '/users/register',
  requireApplication(),
  requireAccessToken(),
  requireUser(),
  requireUserApplicationLink(),
  requireBody<CreateUserBody, UserCreateRequiredBodyKeys>("firstName", "lastName", "email", "password"),
  async (req, res, next) => {
    try {
      const { firstName, middleName, lastName, email, password } = req.body;

      if (!validator.isEmail(email)) {
        throw httpErrors.BadRequest('Invalid email');
      }

      if ((await prisma.users.count({ where: { email } })) > 0) {
        throw httpErrors.Conflict(`User with email ${email} already exists`);
      }

      if (!validator.isStrongPassword(password)) {
        throw httpErrors.BadRequest('Password is not strong enough');
      }
      const passwordHash = await hash(password, Bcrypt.saltRounds);

      const newUser = await prisma.users
        .create({
          data: {
            firstName,
            middleName,
            lastName,
            email,
            password: passwordHash,
          }
        })
        .then(({ password, ...rest }) => rest);

      res.status(httpStatus.CREATED).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  '/users/sync',
  requireApplication(),
  requireAccessToken(),
  requireUser(),
  requireUserApplicationLink(),
  requireBody<UserSyncBody, 'data'>("data"),
  userSyncRequestHandler
);

export default userRouter;
