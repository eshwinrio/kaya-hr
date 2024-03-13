import { expressMiddleware } from "@apollo/server/express4";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import { Api, Cors, Express } from "./config/environment.js";
import apolloServer, { ApolloServerContext, apolloServerContextFn } from "./lib/apollo.js";
import { httpLogStream } from "./lib/logger.js";
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
app.use(cookieParser());
app.use(httpLogStream);

const bindExpressMiddleware = () => app.use(
  `${Express.routePrefix}/v${Express.routeVersion + Api.routeGraphQL}`,
  expressMiddleware<ApolloServerContext>(apolloServer, {
  context: apolloServerContextFn!,
}));

const bindErrorHandler = () => app.use(errorHandler);

export { bindErrorHandler, bindExpressMiddleware };
export default app;
