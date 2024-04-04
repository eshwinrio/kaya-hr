import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Server as HttpServer, createServer } from "http";
import { Server as HttpsServer } from "https";
import app, { bindErrorHandler, bindExpressMiddleware } from "../../app.js";
import { Http } from "../../config/environment.js";
import apolloServer from "../../lib/apollo.js";
import { initPayrollCron } from "../../lib/cron-scheduler.js";
import { logSystem } from "../../lib/logger.js";
import prisma from "../../lib/prisma.js";

let server: HttpServer | HttpsServer | null = null;

async function init() {
  logSystem.debug(`Server startup | PID:${process.pid}`);
  try {
    await prisma.$connect();
    server = createServer(app);
    server.addListener("listening", () => logSystem.info(`Server started on port ${Http.port}`));
    
    apolloServer.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer: server }));
    await apolloServer.start();
    bindExpressMiddleware();
    bindErrorHandler();
    await new Promise<void>((resolve) => server?.listen(Http.port, resolve));

    logSystem.info("Starting cron schedulers...");
    await initPayrollCron();

    process.on('beforeExit', async (code) => {
      try {
        logSystem.debug(
          `SIG:${code} - Releasing resources/Performing cleanup...`
        );
        await prisma.$disconnect();
        server?.close();
      } catch (error) {
        logSystem.error('Cleanup failed', error);
      }
    });
  } catch (e) {
        logSystem.error(e);
    process.exit(1);
  } finally {
    logSystem.debug(`Finalized server startup | PID:${process.pid}`);
  }
}

process.on("unhandledRejection", (error) => {
  logSystem.error(error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  logSystem.error(error);
  process.exit(1);
});

process.on("SIGTERM", (status) => {
  if (server) {
    server.close();
  }
  logSystem.debug(`[SIG:${status}] Exiting process...`);
});

init();
