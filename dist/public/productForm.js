const form = document.getElementById("newProduct");
const button = document.getElementById("submitProduct");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
// async function sendProduct() {
//     try {
//         const formData = new FormData(form);
//         console.log(formData, );
//         const response = await fetch('http://localhost:/products/postProducts',
//             {
//                 method: "POST",
//                 body: formData
//             }
//         )
//     } catch (e) {
//         console.log(e)
//     }
// }
form.addEventListener("submit", async (b) => {
    b.preventDefault();
    try {
        const product = { "productName": nameInput.value, "productPrice": priceInput.value };
        const response = await fetch('http://localhost:3000/protectedProducts/postProducts', {
            method: "POST",
            body: JSON.stringify(product),
            headers: { "Content-type": "application/json" }
        });
    }
    catch (e) {
        console.log(e);
    }
});
export {};
//# sourceMappingURL=productForm.js.map