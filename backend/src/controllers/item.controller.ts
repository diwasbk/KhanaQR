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
};

export default ItemController;