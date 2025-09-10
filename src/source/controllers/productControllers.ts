import { Request, Response } from "express"
import { getProducts} from "../database/getProducts.js"
import { nameFilter, priceFilter, typeFilter, sectionFilter } from "../database/filters.js"
import { insertProduct } from "../database/addProducts.js";

export async function getProductsController(req: Request, res: Response) {
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

            //Turning the query param results into numbers
            const lowPrice = Number(lowPriceString);
            const highPrice = Number(highPriceString);

            //Getting all the items that are not between the lowPrice and highPrice numbers
            const filteredPrices = await priceFilter(lowPrice, highPrice);

            //Keeping only the items that are not on the filteredPrices array
            allProducts = allProducts.filter(product => !filteredPrices.includes(product))
        }

        if (typeof searchedType === "string" || ((Array.isArray(searchedType)) && searchedType.every(item => typeof item === "string"))) {

            //Getting all the items that don't match the type filter
            const filteredTypes = await typeFilter(searchedType);

            //Keeping only the items that are not on the filteredTypes array
            allProducts = allProducts.filter(product => !filteredTypes.includes(product))
        }

        if (typeof searchedSection === "string" || ((Array.isArray(searchedSection)) && searchedSection.every(item => typeof item === "string"))) {

            //Getting all the items that don't match the section filter
            const filteredSections = await sectionFilter(searchedSection);

            //Keeping only the items that are not on the filteredSections array
            allProducts = allProducts.filter(product => !filteredSections.includes(product))
        }

        res.status(201).send(allProducts)
    } catch (err) {
        console.log(err)
    }
}

export async function postProductsController(req:Request, res: Response) {
    try {
        {
            const {productName, productPrice} = req.body;

            console.log(typeof productPrice)

            if (typeof productName === "string") {
                if (typeof Number(productPrice) === "number") insertProduct(productName, productPrice);
                else insertProduct(productName, null)
            }

            else res.status(406).send("Product must vhave a name")

            res.status(201).send("Product added correctly")
        }
    } catch (err) {
        console.log(err)
    }
}