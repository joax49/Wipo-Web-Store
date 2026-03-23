import { NextFunction, Request, Response } from "express";
import { getSales } from "../database/getSales.js";
import { AppError } from "../utils/appError.js";

export async function getSalesController(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.cookies.access_token) {
            throw new AppError(
                "NO_CREDENTIALS",
                "Must provide access token",
                401
            );
        }

        const allSales = await getSales();
        return res.status(201).json({"sales":allSales})
    } catch(err) {
        next(err);
    }
}