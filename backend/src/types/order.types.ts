import mongoose from "mongoose";
import { z } from "zod";

export const orderItemSchema = z.object({
    itemId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    name: z
        .string("Item name is required.")
        .nonempty("Item name is required."),
    quantity: z
        .number("Quantity is required.")
        .int("Quantity must be a whole number.")
        .min(1, "Quantity must be at least 1.")
});
export type orderItemType = z.infer<typeof orderItemSchema>;

export const orderValidationSchema = z.object({
    cafeId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    tableNumber: z
        .string("Table number is required.")
        .nonempty("Table number is required."),
    items: z
        .array(orderItemSchema)
        .min(1, "Order must contain at least one item."),
    status: z
        .enum(["pending", "confirmed", "served", "completed", "cancelled"])
        .default("pending")
});
export type orderType = z.infer<typeof orderValidationSchema>;