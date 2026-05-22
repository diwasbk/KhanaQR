import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { CafeModel } from "../models/cafe.model";

class CafeController {
    createCafeByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;

            // Check user exists
            const userExist = await UserModel.findById({ userId: userId });

            if (!userExist) {
                return res.status(404).send({
                    message: "User not found!",
                    success: false
                });
            };

            // Check if user already has a cafe
            const userCafeExist = await CafeModel.findOne({ userId: userId });

            if (userCafeExist) {
                return res.status(400).send({
                    message: "User already has a cafe profile!",
                    success: false
                });
            };

            const { username, description, address, phoneNumber } = req.body;

            // Check username already exists
            const cafeUsernameExist = await CafeModel.findOne({ username: username });

            if (cafeUsernameExist) {
                return res.status(400).send({
                    message: "Cafe username already exists!",
                    success: false
                });
            };

            // Create cafe
            const result = await CafeModel.create({
                userId: userId.toString(),
                username: username,
                description: description,
                address: address,
                phoneNumber: phoneNumber
            });

            return res.status(201).send({
                message: "Cafe created successfully!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get All Cafe By Status
    getAllCafeByStatus = async (req: Request, res: Response) => {
        try {
            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "Activate";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "Deactive";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            const result = await CafeModel.find({ isActive: isActive });

            res.status(200).send({
                message: result.length ? `${message} cafe fetched successfully!` : "Cafe not found",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get Cafe By Cafe ID
    getCafeByCafeId = async (req: Request, res: Response) => {
        try {
            const cafeId = req.params.cafeId;

            const cafeExist = await CafeModel.findOne({ _id: cafeId });

            if (!cafeExist) {
                return res.status(400).send({
                    message: "Cafe not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Cafe fetched successfully!",
                result: cafeExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Get Cafe By Username
    getCafeByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.params.username;

            const cafeExist = await CafeModel.findOne({ username: username });

            if (!cafeExist) {
                return res.status(400).send({
                    message: "Cafe not found!",
                    success: false
                });
            };

            res.status(200).send({
                message: "Cafe fetched successfully!",
                result: cafeExist,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Update CafeInfo By Cafe ID
    updateCafeInfoByCafeId = async (req: Request, res: Response) => {
        try {
            const cafeId = req.params.cafeId;

            const cafeExist = await CafeModel.findOne({ _id: cafeId });

            if (!cafeExist) {
                return res.status(400).send({
                    message: "Cafe not found!",
                    success: false
                });
            };

            const { description, address, phoneNumber } = req.body;

            const result = await CafeModel.findOneAndUpdate(
                { _id: cafeId },
                { $set: { description: description, address: address, phoneNumber: phoneNumber } },
                { new: true }
            );

            return res.status(201).send({
                message: "Cafe updated successfully!",
                result: result,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };

    // Activate or Deactivate Cafe By Cafe ID
    activateOrdeactivateCafeByCafeId = async (req: Request, res: Response) => {
        try {
            const cafeId = req.params.cafeId;

            const cafeExist = await CafeModel.findOne({ _id: cafeId });

            if (!cafeExist) {
                return res.status(404).send({
                    message: "Cafe not found!",
                    success: false
                });
            };

            let message: string;
            let isActive: boolean;

            if (req.params.isActive == "true") {
                message = "activated";
                isActive = true;
            } else if (req.params.isActive == "false") {
                message = "deactivated";
                isActive = false;
            } else {
                return res.status(400).send({
                    message: "Invalid value! Use true or false.",
                    success: false
                });
            };

            await CafeModel.findOneAndUpdate(
                { _id: cafeId },
                { $set: { isActive: isActive } }
            );

            res.status(200).send({
                message: `Cafe ${message} successfully!`,
                success: true
            });

        } catch (err: any) {
            console.log(err);
            return res.status(500).send({
                message: err.message ? `Internal server error: ${err.message}` : "Internal server error.",
                success: false
            });
        };
    };
};

export default CafeController;