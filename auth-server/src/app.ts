import express from "express";
import { httpLogStream } from "./lib/logger.js";

const app = express();

app.use(httpLogStream);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
