import express from "express";
import { httpLogStream } from "./lib/logger.js";
import errorHandler from "./handlers/error-handler.js";
import authRouter from "./routers/auth-router.js";
import userRouter from "./routers/user-router.js";

const app = express();

app.use(express.json());
app.use(httpLogStream);
app.use(authRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;
