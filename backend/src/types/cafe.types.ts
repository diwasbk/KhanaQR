import mongoose from "mongoose";
import { z } from "zod";

const cafeSchema = z.object({
    userId: z
        .instanceof(mongoose.Types.ObjectId)
        .optional(),
    username: z
        .string()
        .optional(),
    description: z
        .string("Description is required.")
        .nonempty("Description is required.")
        .min(20, "Description must be at least 20 characters."),
    logo: z
        .string("Logo is required.")
        .nonempty("Logo is required."),
    address: z
        .string("Address is required.")
        .nonempty("Address is required.")
        .min(3, "Address must be at least 3 characters."),
    phoneNumber: z
        .string("Phone number is required.")
        .nonempty("Phone number is required.")
        .length(10, "Phone number must be exactly 10 digits.")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    totalCategory: z
        .number()
        .optional(),
    plan: z
        .enum(["starter", "growth", "premium"])
        .default("starter"),
    isActive: z
        .boolean()
        .default(true)
});

export type cafeType = z.infer<typeof cafeSchema>;