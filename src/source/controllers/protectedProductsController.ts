import { NextFunction, Request, Response } from "express";
import { insertProduct } from "../database/addProducts.js";
import { isExistingProduct } from "../database/isExistingProduct.js";
import { AppError } from "../utils/appError.js";

export async function postProductsController(req: Request, res: Response, next: NextFunction) {

    try {
        {

        if (!req.cookies.access_token) {
            throw new AppError(
                "NO_CREDENTIALS",
                "Must provide access token",
                401
            );
        }

        //Getting the product data from the request
        const {productName, productPrice, productType, productSubtype, productAmount, isOnline} = req.body;
        const image = req.file;

        //If the product name is invalid, an error will be returned in the response
        if (typeof productName !== "string") {
            throw new AppError(
                "INVALID_PRODUCT_NAME",
                "Product must have a valid name",
                406
            );
        }

        //checking if the product name is already on the database
        const productExists = await isExistingProduct(productName);
        if (productExists) {
            throw new AppError(
                "PRODUCT_ALREADY_EXISTS",
                "Product already exists",
                409
            );
        }

        //Converting price and amount to numbers
        const productPriceAsNumber = Number(productPrice);
        const productAmountAsNumber = Number(productAmount);

        //If the converted price or amount aren't numbers, the code will return an error
        if (isNaN(productPriceAsNumber) || isNaN(productAmountAsNumber)) {
            throw new AppError(
                "INVALID_NUMBER",
                "Price and amount must be numbers",
                406
            );
        }
        
        insertProduct(productName.trim(), productPrice, productType?.trim(), productSubtype?.trim(), productAmount, image ? image.originalname : null, isOnline);
        res.status(201).json({
            success: true,
            code: "PRODUCT_CREATED"
        });
    }
    } catch (err) {
        next(err);
    }
}