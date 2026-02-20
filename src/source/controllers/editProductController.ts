import { Request, Response } from "express";
import { editData } from "../database/editProducts.js";

export async function editProductsController(req: Request, res: Response) {
    try {
        console.log(req.body)

        const { id, name, price, type, subtype, amount } = req.body;
        editData(id, name, price, type, subtype, amount);

        res.status(200).json({ message: "Product updated" });
    } catch (err) {
        console.error(err)
    }
}