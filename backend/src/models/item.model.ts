import mongoose, { Document, Schema } from "mongoose";
import { itemType } from "../types/item.types";

const itemSchema: Schema = new mongoose.Schema<itemType>({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export interface IItem extends itemType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const ItemModel = mongoose.model<IItem>("Item", itemSchema);