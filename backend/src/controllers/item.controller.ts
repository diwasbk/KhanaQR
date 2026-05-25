import { Request, Response } from "express";
import { ItemModel } from "../models/item.model";
import { CategoryModel } from "../models/category.model";

class ItemController {
    // Add New Item By Category ID
    addNewItemByCategoryId = async (req: Request, res: Response) => {
        try {
            const categoryId = req.params.categoryId;
            const { name, price, photoUrl } = req.body;

            const categoryExist = await CategoryModel.findOne({ _id: categoryId });

            if (!categoryExist) {
                return res.status(404).send({
                    message: "Category not found!",
                    success: false
                });
            }

            const result = await ItemModel.create({
                categoryId: categoryId.toString(),
                name,
                price,
                photoUrl
            });

            // increment category totalItems when applicable
            await CategoryModel.findOneAndUpdate(
                { _id: categoryId },
                { $inc: { totalItems: 1 } }
            );

            return res.status(201).send({
                message: "Item added successfully!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        }
    };

    // Get All Item By Category ID and Status
    getAllItemByCategoryIdAndStatus = async (req: Request, res: Response) => {
        try {
            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "Activate";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "Deactive";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            const result = await ItemModel.find({ categoryId: req.params.categoryId, isActive: isActive });

            res.status(200).send({
                message: result.length ? `${message} items fetched successfully!` : "Items not found",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        }
    };

    // Update Item By Item ID
    updateItemByItemId = async (req: Request, res: Response) => {
        try {
            const itemId = req.params.itemId;

            const itemExist = await ItemModel.findOne({ _id: itemId });

            if (!itemExist) {
                return res.status(400).send({
                    message: "Item not found!",
                    success: false
                });
            }

            const { name,price, photoUrl } = req.body;

            const result = await ItemModel.findOneAndUpdate(
                { _id: itemId },
                { $set: { name: name, price: price, photoUrl: photoUrl } },
                { new: true }
            );

            return res.status(201).send({
                message: "Item updated successfully!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        }
    };

    // Activate or Deactivate Item By Item ID
    activateOrDeactivateItemByItemId = async (req: Request, res: Response) => {
        try {
            const itemId = req.params.itemId;

            const itemExist = await ItemModel.findOne({ _id: itemId });

            if (!itemExist) {
                return res.status(404).send({
                    message: "Item not found!",
                    success: false
                });
            }

            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "activated";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "deactivated";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            }

            await ItemModel.findOneAndUpdate(
                { _id: itemId },
                { $set: { isActive: isActive } }
            );

            res.status(200).send({
                message: `Item ${message} successfully!`,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        }
    };
};

export default ItemController;