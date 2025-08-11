import { Request, Response } from "express"
import { getProducts} from "../database/products.js"
import { nameFilter, priceFilter, typeFilter, sectionFilter } from "../database/filters.js"

export async function productsController(req: Request, res: Response) {
    try {

        //Getting the applied filters from the query params
        const {searchedProduct, lowPriceString, highPriceString,
            searchedType, searchedSection
        } = req.query;

        //Getting an array with all the products from the DB
        let allProducts = await getProducts();

        if (!allProducts) return res.status(404).send("The application could not get the products from the DB")

        //If the searched products are either a string or an array of strings, a script will be executed
        if (typeof searchedProduct === "string" || (Array.isArray(searchedProduct) && searchedProduct.every(item => typeof item === "string"))) {

            //Getting all the items that weren't searched
            const filteredNames = await nameFilter(searchedProduct);

            //If an item is not on the "filteredNames" array, it will be kept in the list of products
            allProducts = allProducts.filter(product => !filteredNames.includes(product))
        }

        if (typeof lowPriceString === "string" && typeof highPriceString === "string") {
            const lowPrice = Number(lowPriceString);
            const highPrice = Number(highPriceString);

            const filteredPrices = await priceFilter(lowPrice, highPrice);

            allProducts = allProducts.filter(product => !filteredPrices.includes(product))
        }

        res.status(201).send(allProducts)
    } catch (err) {
        console.log(err)
    }
}