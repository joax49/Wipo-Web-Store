import { Request, Response } from "express";
import { editPrices } from "../database/editPrice.js";

export async function editPriceController(req: Request, res: Response) {
    try {
        const {oldFloor, oldRoof, newPrice, type} = req.body;

        if(typeof oldFloor === "number" && typeof oldRoof === "number" && typeof newPrice === "number" && typeof type === "string") {
            editPrices(oldFloor, oldRoof, newPrice, type)

            res.status(200).json({ message: "Product updated" });
        }
    } catch (err) {
        console.error(err)
    }
}