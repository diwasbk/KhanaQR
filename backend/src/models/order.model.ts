import mongoose, { Document, Schema } from "mongoose";
import { orderType, orderItemType } from "../types/order.types";

const orderItemMongooseSchema = new mongoose.Schema<orderItemType>({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const orderSchema: Schema = new mongoose.Schema<orderType>({
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cafe",
        required: true
    },
    tableNumber: {
        type: String,
        required: true,
        trim: true
    },
    items: {
        type: [orderItemMongooseSchema],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "served", "completed", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

export interface IOrder extends orderType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);