import mongoose, { Document, Schema } from "mongoose";
import { cafeType } from "../types/cafe.types";

const cafeSchema: Schema = new mongoose.Schema<cafeType>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: null
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    totalCategory: {
        type: Number,
        default: 0
    },
    plan: {
        type: String,
        enum: ["starter", "growth", "premium"],
        default: "starter"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export interface ICafe extends cafeType, Document {
    _id: mongoose.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
};

export const CafeModel = mongoose.model<ICafe>("Cafe", cafeSchema, "cafes");