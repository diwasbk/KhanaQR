import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model";
import { CafeModel } from "../models/cafe.model";

class CategoryController {
    // Add New Category
    addNewCategory = async (req: Request, res: Response) => {
        try {
            const { cafeId, name, description } = req.body;

            // if cafeId provided, ensure cafe exists
            const cafeExist = await CafeModel.findById({ _id: cafeId });

            if (!cafeExist) {
                return res.status(404).send({
                    message: "Cafe not found!",
                    success: false
                });
            };

            // create category
            const result = await CategoryModel.create({
                cafeId: cafeId,
                name: name,
                description: description
            });

            // increment cafe totalCategory when applicable
            await CafeModel.findOneAndUpdate(
                { _id: cafeId },
                { $inc: { totalCategory: 1 } }
            );

            return res.status(201).send({
                message: "Category created successfully!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get All Category by status
    getAllCategoryByStatus = async (req: Request, res: Response) => {
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

            const result = await CategoryModel.find({ isActive: isActive });

            res.status(200).send({
                message: result.length ? `${message} category fetched successfully!` : "Category not found",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default CategoryController;