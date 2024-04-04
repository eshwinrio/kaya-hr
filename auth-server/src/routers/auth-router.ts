import { compare } from "bcrypt";
import { Router } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";
import { Http } from "../config/environment.js";
import prisma from "../lib/prisma.js";
import { generateAccessToken } from "../lib/token.js";
import requireAccessToken from "../middlewares/require-access-token.js";
import requireApplication from "../middlewares/require-application.js";
import requireBody from "../middlewares/require-body.js";
import requireHeaders from "../middlewares/require-headers.js";
import requireUser from "../middlewares/require-user.js";
import requireUserApplicationLink from "../middlewares/require-userApplication-link.js";
import forgotPasswordRequestHandler from "../handlers/forgot-password-handler.js";
import requireQuery from "../middlewares/require-query.js";
import resetPasswordRequestHandler from "../handlers/reset-password-handler.js";

const authRouter = Router();

type TokenGenReqBody = Record<"username" | "password", string>;

authRouter.post(
  "/token",
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

      const token = generateAccessToken(user, res.locals.application);
      return res
        .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  }
);

authRouter.delete(
  "/token",
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
  "/verify",
  requireHeaders("X-Application"),
  requireApplication(),
  requireAccessToken(),
  requireUser(),
  requireUserApplicationLink(),
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

authRouter.get(
  "/auth/reset-password",
  requireHeaders("X-Application"),
  requireApplication(),
  requireQuery("email"),
  forgotPasswordRequestHandler
);

authRouter.post(
  "/auth/reset-password",
  requireHeaders("X-Application"),
  requireApplication(),
  requireBody("password"),
  requireQuery("token"),
  resetPasswordRequestHandler,
);

export default authRouter;
