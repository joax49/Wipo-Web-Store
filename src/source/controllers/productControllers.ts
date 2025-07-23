import { Request, Response } from "express"
import { getProducts, getFavProducts } from "../database/products.js"

export async function productsController(_req: Request, res: Response) {
    try {
        const allProducts = await getProducts()

        if (!allProducts) res.status(404).send("The application could not get the products from the DB")
        res.status(201).send(allProducts)
    } catch (err) {
        console.log(err)
    }
}

export async function favProductsController() {
    
}