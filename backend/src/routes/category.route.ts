import express from "express";
import CategoryController from "../controllers/category.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { categorySchema } from "../types/category.types";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.post("/create", schemaValidateMiddleware(categorySchema), categoryController.addNewCategory);

export default categoryRouter;
