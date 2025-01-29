import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/Error.js";
const app = express();

config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send(`Backend Working`);
});

import userRouter from "./routes/userRoutes.js";
import marketingRouter from "./routes/marketingRoutes.js";
import salesRouter from "./routes/salesRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import operationRoutes from "./routes/operationRoutes.js";

app.use("/api/v1", userRouter);
app.use("/api/v1", marketingRouter);
app.use("/api/v1", salesRouter);
app.use("/api/v1", operationRoutes);
app.use("/api/v1", programRoutes);

app.use(ErrorMiddleware);
export default app;
