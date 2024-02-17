import { Router } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";
import { hash } from "bcrypt";
import validator from "validator";
import requireBody from "../middlewares/require-body.js";
import prisma from "../lib/prisma.js";
import { Bcrypt } from "../config/environment.js";

const userRouter = Router();

interface CreateUserBody {
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[];
}

type RequiredKeys = "firstName" | "lastName" | "email" | "password" | "roles";

userRouter.post(
  '/users/register',
  requireBody<CreateUserBody, RequiredKeys>("firstName", "lastName", "email", "password", "roles"),
  async (req, res, next) => {
    try {
      const { firstName, middleName, lastName, email, password, roles } = req.body;

      if (!validator.isEmail(email)) {
        throw httpErrors.BadRequest('Invalid email');
      }

      const matchedRoles = await prisma.roles.findMany({ where: { code: { in: roles } } });
      const unmatchedRoles = roles.filter((role) => !matchedRoles.map((role) => role.code).includes(role));
      if (unmatchedRoles.length) {
        throw httpErrors.BadRequest(`Invalid roles: ${unmatchedRoles.join()}`);
      }

      if ((await prisma.users.count({ where: { email } })) > 0) {
        throw httpErrors.Conflict(`User with email ${email} already exists`);
      }

      if (!validator.isStrongPassword(password)) {
        throw httpErrors.BadRequest('Password is not strong enough');
      }
      const passwordHash = await hash(password, Bcrypt.saltRounds);

      const newUser = await prisma.users.create({
        data: {
          firstName,
          middleName,
          lastName,
          email,
          password: passwordHash,
          UserRoles: {
            createMany: {
              data: matchedRoles.map((role) => ({ roleId: role.id }))
            }
          }
        }
      })
        .then(({ password, ...rest }) => rest);

      res.status(httpStatus.CREATED).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
