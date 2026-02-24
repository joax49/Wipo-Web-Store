import { Request, Response } from "express";
import { editPrices } from "../database/editPrice.js";

export async function editPriceController(req: Request, res: Response) {
    try {
        const oldFloor = Number(req.body.oldFloor);
        const oldRoof = Number(req.body.oldRoof);
        const newPrice = Number(req.body.newPrice);
        const type = req.body.type?.trim() || null;

        if (!isNaN(oldFloor) && !isNaN(oldRoof) && !isNaN(newPrice)) {
            await editPrices(oldFloor, oldRoof, newPrice, type);
            return res.status(200).json({ message: "Product updated" });
        }

        return res.status(400).json({ message: "Invalid input types" });
            } catch (err) {
        console.error(err)
    }
}