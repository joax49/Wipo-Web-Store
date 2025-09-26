import { getProducts } from "../database/getProducts.js";
import { nameFilter, priceFilter, typeFilter, sectionFilter } from "../database/filters.js";
import { insertProduct } from "../database/addProducts.js";
export async function getProductsController(req, res) {
    try {
        //Getting the applied filters from the query params
        const { searchedProduct, lowPriceString, highPriceString, searchedType, searchedSection } = req.query;
        //Getting an array with all the products from the DB
        let allProducts = await getProducts();
        if (!allProducts)
            return res.status(404).send("The application could not get the products from the DB");
        //If the searched products are either a string or an array of strings, a script will be executed
        if (typeof searchedProduct === "string" || (Array.isArray(searchedProduct) && searchedProduct.every(item => typeof item === "string"))) {
            //Getting all the items that weren't searched
            const filteredNames = await nameFilter(searchedProduct);
            //If an item is not on the "filteredNames" array, it will be kept in the list of products
            allProducts = allProducts.filter(product => !filteredNames.includes(product));
        }
        if (typeof lowPriceString === "string" && typeof highPriceString === "string") {
            //Turning the query param results into numbers
            const lowPrice = Number(lowPriceString);
            const highPrice = Number(highPriceString);
            //Getting all the items that are not between the lowPrice and highPrice numbers
            const filteredPrices = await priceFilter(lowPrice, highPrice);
            //Keeping only the items that are not on the filteredPrices array
            allProducts = allProducts.filter(product => !filteredPrices.includes(product));
        }
        if (typeof searchedType === "string" || ((Array.isArray(searchedType)) && searchedType.every(item => typeof item === "string"))) {
            //Getting all the items that don't match the type filter
            const filteredTypes = await typeFilter(searchedType);
            //Keeping only the items that are not on the filteredTypes array
            allProducts = allProducts.filter(product => !filteredTypes.includes(product));
        }
        if (typeof searchedSection === "string" || ((Array.isArray(searchedSection)) && searchedSection.every(item => typeof item === "string"))) {
            //Getting all the items that don't match the section filter
            const filteredSections = await sectionFilter(searchedSection);
            //Keeping only the items that are not on the filteredSections array
            allProducts = allProducts.filter(product => !filteredSections.includes(product));
        }
        res.status(201).send(allProducts);
    }
    catch (err) {
        res.status(402).send(err);
    }
}
export async function postProductsController(req, res) {
    try {
        {
            //Getting the product data from the request
            const { productName, productPrice } = req.body;
            //If the product's name is a string, the code will try to turn 
            //the product price into a number and insert it into the database
            if (typeof productName === "string") {
                const numberProductPrice = Number(productPrice);
                if (typeof numberProductPrice === "number")
                    insertProduct(productName, numberProductPrice);
                //If product price cannot be converted into a number, a null
                //value will be inserted into the database instead
                else
                    insertProduct(productName, null);
            }
            //If the product name is invalid, an error will be returned in the response
            else
                res.status(406).send("Product must have a name");
            res.status(201).send("Product added correctly");
        }
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=productControllers.js.map