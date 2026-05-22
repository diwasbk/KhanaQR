import express from "express";
import CafeController from "../controllers/cafe.controller";
import schemaValidateMiddleware from "../middlewares/schema.validator.middleware";
import { cafeSchema } from "../types/cafe.types";

const cafeRouter = express.Router();
const cafeController = new CafeController();

cafeRouter.post("/create/:userId", schemaValidateMiddleware(cafeSchema), cafeController.createCafeByUserId);
cafeRouter.get("/all/:isActive", cafeController.getAllCafeByStatus);
cafeRouter.get("/:cafeId", cafeController.getCafeByCafeId);
cafeRouter.get("/username/:username", cafeController.getCafeByUsername);
cafeRouter.put("/update/:cafeId", schemaValidateMiddleware(cafeSchema.partial()), cafeController.updateCafeInfoByCafeId);
cafeRouter.patch("/activate-deactivate/:cafeId/:isActive", cafeController.activateOrdeactivateCafeByCafeId);
cafeRouter.delete("/delete/:cafeId", cafeController.deleteCafeByCafeId);

export default cafeRouter;  