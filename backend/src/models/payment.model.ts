import mongoose, { Document, Schema } from "mongoose";
import { paymentType } from "../types/payment.types";

const paymentSchema: Schema = new mongoose.Schema<paymentType>({
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cafe",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    discountAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    method: {
        type: String,
        enum: ["cash", "card", "esewa", "khalti"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    transactionId: {
        type: String,
        default: null
    }
}, { timestamps: true });

export interface IPayment extends paymentType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const PaymentModel = mongoose.model<IPayment>("Payment", paymentSchema);