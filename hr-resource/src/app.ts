import express from "express";
import cors, { CorsOptions } from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { httpLogStream } from "./lib/logger.js";
import apolloServer, { ApolloServerContext, apolloServerContextFn } from "./lib/apollo.js";
import { Cors } from "./config/environment.js";
import errorHandler from "./middlewares/error-handler.js";

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
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(httpLogStream);

const bindExpressMiddleware = () => app.use(
  "/",
  expressMiddleware<ApolloServerContext>(apolloServer, {
  context: apolloServerContextFn!,
}));

const bindErrorHandler = () => app.use(errorHandler);

export { bindExpressMiddleware, bindErrorHandler };
export default app;
