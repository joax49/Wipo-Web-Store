import { insertProduct } from "../database/addProducts.js";
import { isExistingProduct } from "../database/isExistingProduct.js";
export async function postProductsController(req, res) {
    try {
        {
            if (!req.cookies.access_token) {
                throw new Error("Invalid access: Must provide token");
            }
            //Getting the product data from the request
            const { productName, productPrice, productType, productSubtype, productAmount } = req.body;
            const image = req.file;
            //If the product name is invalid, an error will be returned in the response
            if (typeof productName !== "string") {
                return res.status(406).send("Product must have a name");
            }
            //checking if the product name is already on the database
            const productExists = await isExistingProduct(productName);
            if (productExists)
                return res.status(406).send("Product name already exists");
            //Converting price and amount to numbers
            const productPriceAsNumber = Number(productPrice);
            const productAmountAsNumber = Number(productAmount);
            //If the converted price or amount aren't numbers, the code will return an error
            if (isNaN(productPriceAsNumber) || isNaN(productAmountAsNumber)) {
                throw new Error("The product's price and amount must be a number");
            }
            insertProduct(productName, productPrice, productType, productSubtype, productAmount, image ? image.originalname : null);
            res.status(201).send("Product added correctly");
        }
    }
    catch (err) {
        res.status(401).send(err);
    }
}
export async function editProductsController(req, res) {
    try {
    }
    catch (err) {
        res.status(401).send({ err });
    }
}
//# sourceMappingURL=protectedProductsController.js.map