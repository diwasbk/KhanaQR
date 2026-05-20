import mongoose from "mongoose";
import { z } from "zod";

const variantSchema = z.object({
    name: z
        .string("Variant name is required.")
        .nonempty("Variant name is required.")
        .min(3, "Variant name must be at least 3 characters."),
    price: z
        .number("Price is required.")
        .min(0, "Price cannot be negative."),
    isAvailable: z
        .boolean()
        .default(true)
});

const itemSchema = z.object({
    categoryId: z
        .instanceof(mongoose.Types.ObjectId),
    name: z
        .string("Item name is required.")
        .nonempty("Item name is required.")
        .min(3, "Item name must be at least 3 characters."),
    photoUrl: z
        .string("Photo is required.")
        .nonempty("Photo is required."),
    variant: z
        .array(variantSchema)
        .default([]),
    isAvailable: z
        .boolean()
        .default(true)
});

export type itemType = z.infer<typeof itemSchema>;