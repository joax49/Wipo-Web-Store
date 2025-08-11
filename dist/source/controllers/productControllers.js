export async function productsController(req, res) {
    try {
        const { searchedProduct, lowPrice, highPrice, searchedType, searchedSection } = req.query;
        console.log(searchedProduct);
        console.log(typeof searchedProduct);
        // let allProducts = await getProducts();
        // if (!allProducts) return res.status(404).send("The application could not get the products from the DB")
        // if (typeof searchedProduct === "string") {
        //     const filteredNames = nameFilter(searchedProduct);
        // }
        // res.status(201).send(allProducts)
        res.status(201).send("hi!");
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=productControllers.js.map