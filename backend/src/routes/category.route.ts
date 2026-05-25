import express from "express";
import CategoryController from "../controllers/category.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { categorySchema } from "../types/category.types";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.post("/add/:cafeId", schemaValidateMiddleware(categorySchema), categoryController.addNewCategoryByCafeId);
categoryRouter.get("/all/:cafeId/:isActive", categoryController.getAllCategoryByCafeIdAndStatus);
categoryRouter.put("/update/:categoryId", schemaValidateMiddleware(categorySchema.partial()), categoryController.updateCategoryByCategoryId);
categoryRouter.patch("/activate-deactivate/:categoryId/:isActive", categoryController.activateOrdeactivateCategoryByCategoryId);
categoryRouter.delete("/delete/:categoryId", categoryController.deleteCategoryByCategoryId);

export default categoryRouter;
