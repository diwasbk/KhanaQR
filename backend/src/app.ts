import express, { Application } from "express";
import authRouter from "./routes/auth.route";
import cafeRouter from "./routes/cafe.route";
import categoryRouter from "./routes/category.route";
import itemRouter from "./routes/item.route";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cafe", cafeRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);

export default app;