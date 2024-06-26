import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import { Api, Cors, Express } from "./config/environment.js";
import errorHandler from "./handlers/error-handler.js";
import { httpLogStream } from "./lib/logger.js";
import applicationRouter from "./routers/application-router.js";
import authRouter from "./routers/auth-router.js";
import userRouter from "./routers/user-router.js";

const app = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: Cors.methods,
  credentials: Cors.allowCredentials,
  maxAge: Cors.maxAge,
}


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(httpLogStream);
app.use(`${Express.routePrefix}/v${Express.routeVersion + Api.Auth.routeApplications}`, applicationRouter);
app.use(`${Express.routePrefix}/v${Express.routeVersion + Api.Auth.routeAuth}`, authRouter);
app.use(`${Express.routePrefix}/v${Express.routeVersion + Api.Auth.routeUsers}`, userRouter);
app.use(errorHandler);

export default app;
