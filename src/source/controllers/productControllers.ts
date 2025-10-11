import { Request, Response } from "express"
import { getProducts} from "../database/getProducts.js"

export async function getProductsController(req: Request, res: Response) {
    try {

        //Getting the applied filters from the query params
        const {searchedProduct, lowPriceString, highPriceString,
            searchedType, searchedSection
        } = req.query;

        const {page} = req.params;

        const pageNumber = Number(page);

        //Getting an array with all the products from the DB
        let allProducts = await getProducts((pageNumber  - 1)* 20);
        console.log(allProducts);

        if (!allProducts) return res.status(404).send("The application could not get the products from the DB")

        return res.status(200).send(allProducts)
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err})
    }
}