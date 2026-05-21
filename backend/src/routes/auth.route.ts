import express from "express";
import AuthController from "../controllers/auth.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { signupSchema } from "../types/auth.types";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", schemaValidateMiddleware(signupSchema), authController.signupUser);

export default authRouter;