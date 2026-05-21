import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { CafeModel } from "../models/cafe.model";

class CafeController {
    createCafeByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;

            // Check user exists
            const userExist = await UserModel.findById(userId);

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            // Check if user already has a cafe
            const userCafeExist = await CafeModel.findOne({ userId });

            if (userCafeExist) {
                return res.status(400).send({
                    message: "User already has a cafe profile!",
                    success: false
                });
            };

            const { username, description, address, phoneNumber, logo } = req.body;

            // Check username already exists
            const cafeUsernameExist = await CafeModel.findOne({ username });

            if (cafeUsernameExist) {
                return res.status(400).send({
                    message: "Cafe username already exists!",
                    success: false
                });
            }

            // Create cafe
            const result = await CafeModel.create({
                userId: userId.toString(),
                username: username,
                description: description,
                logo: logo,
                address: address,
                phoneNumber: phoneNumber
            });

            return res.status(201).send({
                message: "Cafe created successfully!",
                success: true,
                data: result
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
}

export default CafeController;