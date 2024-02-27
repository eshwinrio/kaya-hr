import express from "express";
import cors, { CorsOptions } from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { httpLogStream } from "./lib/logger.js";
import apolloServer, { ApolloServerContext } from "./lib/apollo.js";
import { Cors } from "./config/environment.js";
import requireVerification from "./middlewares/require-verification.js";
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
  requireVerification(),
  expressMiddleware<ApolloServerContext>(apolloServer, {
  context: async ({ res }) => {
    console.log(res.locals);
    return { email: res.locals.email };
  },
}));

const bindErrorHandler = () => app.use(errorHandler);

export { bindExpressMiddleware, bindErrorHandler };
export default app;
