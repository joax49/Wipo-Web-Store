import { Request, Response } from "express";
import { editPrices } from "../database/editPrice.js";

export async function editPriceController(req: Request, res: Response) {
    try {
        if (!req.cookies.access_token) {
            throw new Error("Invalid access: Must provide token")
        }

        const oldFloor = Number(req.body.oldFloor);
        const oldRoof = Number(req.body.oldRoof);
        const percentage = Number(req.body.percentage);
        const type = req.body.type?.trim() || null;

        if (!isNaN(oldFloor) && !isNaN(oldRoof) && !isNaN(percentage)) {
            const multiplier = 1 + (percentage / 100);

            await editPrices(oldFloor, oldRoof, multiplier, type);
            return res.status(200).json({ message: "Product updated" });
        }

        return res.status(400).json({ message: "Invalid input types" });
    } catch (err) {
        res.status(401).send(err);
    }
}