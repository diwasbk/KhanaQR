import mongoose, { Document, Schema } from "mongoose";
import { categoryType } from "../types/category.types";

const categorySchema: Schema = new mongoose.Schema<categoryType>({
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cafe"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalItems: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export interface ICategory extends categoryType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);