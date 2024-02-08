import { Router } from "express";
import httpErrors, { HttpError } from "http-errors";
import prisma from "../lib/prisma";

const authRouter = Router();


authRouter.post(
  "/auth/token",
  // TODO: implement requireBody middleware
  async (req, res) => {
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

      return res.json("token"); // TODO: implement token generation
    } catch (error) {

    }
  }
)

export default authRouter;
