import { Router } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";
import { compare } from "bcrypt";
import prisma from "../lib/prisma.js";
import requireBody from "../middlewares/require-body.js";
import requireHeaders from "../middlewares/require-headers.js";
import requireAccessToken from "../middlewares/require-access-token.js";
import { generateAccessToken } from "../lib/token.js";
import { Http } from "../config/environment.js";
import requireApplication from "../middlewares/require-application.js";

const authRouter = Router();

type TokenGenReqBody = Record<"username" | "password", string>;

authRouter.post(
  "/auth/token",
  requireHeaders("X-Application"),
  requireApplication(),
  requireBody<TokenGenReqBody, "username" | "password">("username", "password"),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await prisma.users.findUnique({
        where: {
          email: username
        }
      });

      if (!user) {
        throw httpErrors.NotFound("User not found");
      }

      if (await compare(password, user.password) === false) {
        throw httpErrors.Unauthorized("Invalid credentials");
      }

      const userRoles = await prisma.userRoleMappings.findMany({
        where: {
          userId: user.id
        },
        include: {
          role: true
        }
      });
      const token = generateAccessToken(user, res.locals.application, userRoles.map(userRole => userRole.role));

      return res
        .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .status(httpStatus.OK)
        .json({ token }); // TODO: Remove access token from response
    } catch (error) {
      next(error);
    }
  }
);

authRouter.delete(
  "/auth/token",
  requireAccessToken(),
  async (_req, res, next) => {
    try {
      res.clearCookie("access_token");
      return res.sendStatus(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(
  "/auth/verify",
  requireAccessToken(),
  async (_req, res, next) => {
    try {
      if (Http.responseVerifyTokenCacheEnable) {
        res.append("Cache-Control", `public, max-age=${Http.responseVerifyTokenCacheMaxAge}`);
      }
      return res.json(res.locals.accessTokenData);
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
