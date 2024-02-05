import { createServer } from "http";
import app from "../../app.js";
import { logSystem } from "../../lib/logger.js";

const server = createServer(app);

server.listen(process.env.HTTP_PORT);

server.addListener("error", (e) => {
  logSystem.error(e);
});

server.addListener("listening", () => {
  logSystem.info(`Server started on port ${process.env.HTTP_PORT}`);
});
