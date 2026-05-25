import mongoose from "mongoose";
import { z } from "zod";

export const itemSchema = z.object({
    categoryId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    name: z
        .string("Item name is required.")
        .nonempty("Item name is required.")
        .min(3, "Item name must be at least 3 characters."),
    price: z
        .number("Price is required.")
        .min(0, "Price cannot be negative."),
    photoUrl: z
        .string("Photo is required.")
        .nonempty("Photo is required."),
    isActive: z
        .boolean()
        .default(true)
});

export type itemType = z.infer<typeof itemSchema>;