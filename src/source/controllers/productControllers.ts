import { Request, Response } from "express"
import { getProducts} from "../database/products.js"
import { favoriteProdsFilter } from "../database/filters.js"

export async function productsController(req: Request, res: Response) {
    try {
        const {filter} = req;

        let allProducts = await getProducts()

        if (filter.filterFavorite) {
            const favProds = await favoriteProdsFilter();

            allProducts = allProducts.filter(item => !(favProds.includes(item)))
        }

        if (!allProducts) res.status(404).send("The application could not get the products from the DB")
        res.status(201).send(allProducts)
    } catch (err) {
        console.log(err)
    }
}