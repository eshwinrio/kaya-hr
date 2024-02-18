import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { Cors } from "./config/environment.js";
import { httpLogStream } from "./lib/logger.js";
import errorHandler from "./handlers/error-handler.js";
import authRouter from "./routers/auth-router.js";
import userRouter from "./routers/user-router.js";
import applicationRouter from "./routers/application-router.js";

const app = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    return Cors.origins.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
  methods: Cors.methods,
  credentials: Cors.allowCredentials,
  maxAge: Cors.maxAge,
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(httpLogStream);
app.use(applicationRouter);
app.use(authRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;
