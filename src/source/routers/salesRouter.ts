import express from "express";
import { getSalesController } from "../controllers/getSalesController.js";

export const salesRouter = express.Router();
salesRouter.use(express.json());

salesRouter.get('/allSales', getSalesController);