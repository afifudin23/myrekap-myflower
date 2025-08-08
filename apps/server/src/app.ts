import cors from "cors";
import rootRouter from "./routes";
import { attachLogger, errorMiddleware, httpLogger } from "./middlewares";
import helmet from "helmet";
import { InternalException } from "./exceptions";
import ErrorCode from "./constants/error-code";
import cookieParser from "cookie-parser";
import path from "path";
import { env } from "./config";
import express from "express";
const app = express();

// middlewares
app.use(helmet()); // for security
const allowedOrigins = env.CLIENT_ORIGINS.split(",") || [];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies to be sent
        exposedHeaders: ["Content-Disposition"], // Expose Content-Disposition header for file downloads
    })
); // for cross-origin requests

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json()); // for parsing json
app.use(attachLogger); // for logging requests with request id
app.use(httpLogger); // for logging http requests
app.use(cookieParser());
const data = [
    {
        name: "John Doe",
        age: 30,
    },
    {
        name: "Jane Smith",
        age: 25,
    },
    {
        name: "Alice Johnson",
        age: 28,
    },
];
app.get("/", (_req, res) => {
    res.send("Haiiii");
});
app.get("/data", (_req, res) => {
    res.json({ message: "Get Data Success", data });
});

app.get("/test-error", async (_req, _res, next) => {
    next(new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, null));
});

app.use("/api", rootRouter);

app.use(errorMiddleware); // error handling middleware

export default app;
