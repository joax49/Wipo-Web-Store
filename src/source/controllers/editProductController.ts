import { Request, Response } from "express";
import { editData } from "../database/editProducts.js";

export async function editProductsController(req: Request, res: Response) {
    try {
        if (!req.cookies.access_token) {
            throw new Error("Invalid access: Must provide token")
        }

        const { id, name, price, type, subtype, amount } = req.body;
        editData(id, name?.trim(), price, type?.trim(), subtype?.trim(), amount);

        res.status(200).json({ message: "Product updated" });
    } catch (err) {
        res.status(401).send(err);
    }
}