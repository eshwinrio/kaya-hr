import express from "express";
import { httpLogStream } from "./lib/logger.js";
import apolloServer from "./lib/apollo.js";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();

app.use(express.json());
app.use(httpLogStream);

const bindExpressMiddleware = () => app.use("/", expressMiddleware(apolloServer, {
  context: async ({ req }) => ({ token: req.headers.token }),
}));

export { bindExpressMiddleware };
export default app;
