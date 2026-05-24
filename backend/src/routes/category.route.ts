import express from "express";
import CategoryController from "../controllers/category.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { categorySchema } from "../types/category.types";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.post("/create", schemaValidateMiddleware(categorySchema), categoryController.addNewCategory);
categoryRouter.get("/all/:isActive", categoryController.getAllCategoryByStatus);
categoryRouter.put("/update/:categoryId", schemaValidateMiddleware(categorySchema.partial()), categoryController.updateCategoryByCategoryId);

export default categoryRouter;
