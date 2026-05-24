import mongoose from "mongoose";
import { z } from "zod";

export const categorySchema = z.object({
    cafeId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    name: z
        .string("Category name is required.")
        .nonempty("Category name is required.")
        .min(3, "Category name must be at least 3 characters."),
    description: z
        .string("Description is required.")
        .nonempty("Description is required.")
        .min(10, "Description must be at least 10 characters."),
    totalItems: z
        .number()
        .optional(),
    isActive: z
        .boolean()
        .default(true)
});
export type categoryType = z.infer<typeof categorySchema>;