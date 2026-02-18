async function fetchProduct(name) {
    try {
        const response = await fetch('http://localhost:3000//protectedProducts/editProducts', {
            method: "put",
            body: JSON.stringify({ "productName": name }),
            headers: { "Content-type": "application/json" }
        });
        if (!response.ok) {
            console.error("Couldn't find the product");
        }
        else {
            const data = await response.json();
            console.log(data);
        }
    }
    catch (err) {
        console.error(err);
    }
}
export {};
//# sourceMappingURL=findProduct.js.map