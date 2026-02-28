import { Request, Response } from "express";
import { getSales } from "../database/getSales.js";

export async function getSalesController(req: Request, res: Response) {

    const allSales = getSales();
    return res.status(201).json({"sales":allSales})
}