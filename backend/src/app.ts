import express, { Application } from "express";
import authRouter from "./routes/auth.route";
import cafeRouter from "./routes/cafe.route";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cafe", cafeRouter);

export default app;