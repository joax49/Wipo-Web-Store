import { NextFunction, Request, Response } from "express";
import { editData } from "../database/editProducts.js";
import { AppError } from "../utils/appError.js";

export async function editProductsController(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.cookies.access_token) {
            throw new AppError(
                "NO_CREDENTIALS",
                "Must provide access token",
                401
            );
        }

        const { id, name, price, type, subtype, amount } = req.body;
        editData(id, name?.trim(), price, type?.trim(), subtype?.trim(), amount);

        res.status(200).json({ message: "Product updated" });
    } catch (err) {
        next(err);
    }
}