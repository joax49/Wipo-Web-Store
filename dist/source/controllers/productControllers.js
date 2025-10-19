import { getProducts } from "../database/getProducts.js";
export async function getProductsController(req, res) {
    try {
        //Getting the applied filters from the query params
        const { searchedProduct, floorPrice, roofPrice, searchedType, searchedSubtype } = req.query;
        console.log(searchedProduct);
        console.log(floorPrice);
        console.log(roofPrice);
        console.log(searchedType);
        console.log(searchedSubtype);
        const floorPriceNumber = Number(floorPrice);
        const roofPriceNumber = Number(roofPrice);
        //Getting an array with all the products from the DB
        let allProducts = await getProducts();
        if (!allProducts)
            return res.status(404).send("The application could not get the products from the DB");
        //Applying filters
        if (typeof searchedProduct === "string")
            allProducts = allProducts.filter(product => product.name.toLowerCase().includes(searchedProduct.toLowerCase()));
        if (typeof floorPriceNumber === "number" && !Number.isNaN(floorPriceNumber))
            allProducts = allProducts.filter(product => product.price >= floorPriceNumber);
        if (typeof roofPriceNumber === "number" && !Number.isNaN(roofPriceNumber))
            allProducts = allProducts.filter(product => product.price <= roofPriceNumber);
        if (typeof searchedType === "string")
            allProducts = allProducts.filter(product => product.type.toLowerCase().includes(searchedType.toLowerCase()));
        if (typeof searchedSubtype === "string")
            allProducts = allProducts.filter(product => product.subtype.toLowerCase().includes(searchedSubtype.toLowerCase()));
        console.log(allProducts);
        return res.status(200).send(allProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
}
//# sourceMappingURL=productControllers.js.map