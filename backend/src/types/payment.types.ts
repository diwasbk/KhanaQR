import mongoose from "mongoose";
import { z } from "zod";

export const paymentSchema = z.object({
    cafeId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    orderId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    subtotal: z
        .number("Subtotal is required.")
        .min(0, "Subtotal cannot be negative."),
    discountPercentage: z
        .number("Discount percentage is required.")
        .min(0, "Discount percentage cannot be negative.")
        .max(100, "Discount percentage cannot exceed 100%")
        .default(0),
    discountAmount: z
        .number("Discount amount is required.")
        .min(0, "Discount amount cannot be negative.")
        .default(0),

    total: z
        .number("Total is required.")
        .min(0, "Total cannot be negative."),
    method: z
        .enum(["cash", "card", "esewa", "khalti"]),
    status: z
        .enum(["pending", "paid", "failed", "refunded"])
        .default("pending"),
    transactionId: z
        .string()
        .optional()
});

export type paymentType = z.infer<typeof paymentSchema>;