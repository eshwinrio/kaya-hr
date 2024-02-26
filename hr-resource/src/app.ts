import express from "express";
import cors, { CorsOptions } from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { httpLogStream } from "./lib/logger.js";
import apolloServer, { ApolloServerContext } from "./lib/apollo.js";
import { Cors } from "./config/environment.js";

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

const bindExpressMiddleware = () => app.use("/", expressMiddleware(apolloServer, {
  context: async ({ req }) => ({ token: req.headers.token }),
}));

export { bindExpressMiddleware };
export default app;
