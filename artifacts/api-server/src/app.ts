import express, { type ErrorRequestHandler, type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from "./middlewares/clerkProxyMiddleware";
import router from "./routes";
import healthRouter from "./routes/health";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// Startup probes have no trusted public hostname and must not depend on auth.
app.use("/api", healthRouter);
app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  clerkMiddleware((req) => {
    const host = getClerkProxyHost(req);
    return {
      publishableKey: host
        ? publishableKeyFromHost(host, process.env.CLERK_PUBLISHABLE_KEY)
        : process.env.CLERK_PUBLISHABLE_KEY,
    };
  }),
);

app.use("/api", router);

const handleRequestError: ErrorRequestHandler = (error, req, res, next) => {
  if (
    error instanceof Error &&
    "type" in error &&
    error.type === "entity.too.large"
  ) {
    res.status(413).json({ error: "Logo images must be 5 MB or smaller" });
    return;
  }
  next(error);
};

app.use(handleRequestError);

export default app;
