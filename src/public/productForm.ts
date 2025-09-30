const form = document.getElementById("newProduct") as HTMLFormElement;
const button = document.getElementById("submitProduct") as HTMLButtonElement;

const nameInput = document.getElementById("productName") as HTMLInputElement;
const priceInput = document.getElementById("productPrice") as HTMLInputElement;

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
    b.preventDefault()

    try {
        const product = {"productName": nameInput.value, "productPrice": priceInput.value};

        const response = await fetch('http://localhost:3000/protectedProducts/postProducts',
            {
                method: "POST",
                body: JSON.stringify(product),
                headers: {"Content-type" : "application/json"}
            }
        )

    } catch (e) {
        console.log(e)
    }
})