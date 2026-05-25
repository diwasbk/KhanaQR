import express from "express";
import ItemController from "../controllers/item.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { itemSchema } from "../types/item.types";

const itemRouter = express.Router();
const itemController = new ItemController();

itemRouter.post("/add/:categoryId", schemaValidateMiddleware(itemSchema), itemController.addNewItemByCategoryId);

export default itemRouter;