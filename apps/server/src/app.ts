import express from "express";
import cors from "cors";
import rootRouter from "./routes";
import { attachLogger, errorMiddleware, httpLogger } from "./middlewares";
import helmet from "helmet";
import { InternalException } from "./exceptions";
import ErrorCode from "./constants/error-code";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// middlewares
app.use(helmet()); // for security
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // Allow cookies to be sent
        exposedHeaders: ["Content-Disposition"], // Expose Content-Disposition header for file downloads
    })
); // for cross-origin requests
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json()); // for parsing json
app.use(attachLogger); // for logging requests with request id
app.use(httpLogger); // for logging http requests
app.use(cookieParser());

app.get("/test-error", async (_req, _res, next) => {
    next(new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, null));
});

app.use("/api", rootRouter);

app.use(errorMiddleware); // error handling middleware

export default app;
