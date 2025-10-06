import { Request, Response } from "express"
import { getProducts} from "../database/getProducts.js"

export async function getProductsController(req: Request, res: Response) {
    try {

        //Getting the applied filters from the query params
        const {searchedProduct, lowPriceString, highPriceString,
            searchedType, searchedSection
        } = req.query;

        //Getting an array with all the products from the DB
        let allProducts = await getProducts();

        if (!allProducts) return res.status(404).send("The application could not get the products from the DB")

        return res.status(201).send(allProducts)
    } catch (err) {
        res.status(402).send(err)
    }
}