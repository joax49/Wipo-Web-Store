import { insertProduct } from "../database/addProducts.js";
export async function postProductsController(req, res) {
    try {
        {
            if (!req.cookies.access_token) {
                throw new Error("Invalid access: Must provide token");
            }
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
        res.status(401).send({ err });
    }
}
//# sourceMappingURL=protectedProductsController.js.map