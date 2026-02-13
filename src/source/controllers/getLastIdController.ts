import { Request, Response } from "express";
import { returnLastId } from "../database/getLastId.js";

export async function getLastIdController(req: Request, res: Response) {
    const id = await returnLastId();

    if (typeof id === "number") return res.status(200).json({"id": id});
}