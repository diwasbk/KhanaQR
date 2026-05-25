import express from "express";
import ItemController from "../controllers/item.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { itemSchema } from "../types/item.types";

const itemRouter = express.Router();
const itemController = new ItemController();

itemRouter.post("/add/:categoryId", schemaValidateMiddleware(itemSchema), itemController.addNewItemByCategoryId);
itemRouter.get("/all/:categoryId/:isActive", itemController.getAllItemByCategoryIdAndStatus);
itemRouter.put("/update/:itemId", schemaValidateMiddleware(itemSchema.partial()), itemController.updateItemByItemId);

export default itemRouter;