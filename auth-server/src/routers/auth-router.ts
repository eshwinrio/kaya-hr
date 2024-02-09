import { Router } from "express";
import httpErrors, { HttpError } from "http-errors";
import { compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import requireBody from "../middlewares/require-body.js";
import { JWT } from "../config/environment.js";

const authRouter = Router();

type TokenGenReqBody = Record<"username" | "password", string>;
authRouter.post(
  "/auth/token",
  requireBody<TokenGenReqBody>("username", "password"),
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

      if ((await compare(password, user.password)) === false) {
        throw httpErrors.Unauthorized("Invalid credentials");
      }

      const token = jsonwebtoken.sign({ id: user.id }, JWT.accessSecret, {
        expiresIn: JWT.accessValidity
      });

      return res.json({ accessToken: token });
    } catch (error) {
      next(error);
    }
  }
)

export default authRouter;
