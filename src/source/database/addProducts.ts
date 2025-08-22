import { Pool } from "pg";

type Product = {
    name: string,
    price: number,
    type: string,
    section: string,
    isFavorite: boolean
}

export async function insertProduct(newProduct:Product) {
    
}