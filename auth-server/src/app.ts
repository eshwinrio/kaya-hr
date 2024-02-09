import express from "express";
import { httpLogStream } from "./lib/logger.js";
import errorHandler from "./handlers/error-handler.js";
import userRouter from "./routers/user-router.js";

const app = express();

app.use(express.json());
app.use(httpLogStream);
app.use(userRouter);
app.use(errorHandler);

export default app;
