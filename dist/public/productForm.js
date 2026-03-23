import { openUserAuthWindow } from "./openUserAuth.js";
const form = document.getElementById("newProduct");
const lastIdIndicator = document.getElementById('last-id-indicator');
const productExistsErrorWindow = document.getElementById('productAlreadyExistsError');
const invalidValueErrorWindow = document.getElementById('invalidValueError');
async function loadNextId() {
    try {
        const response = await fetch('http://localhost:3000/products/getLastId', {
            method: "GET"
        });
        if (!response.ok) {
            console.log("Error with the id indicator");
        }
        else {
            const id = await response.json();
            lastIdIndicator.innerText = "Ultimo id:" + id.id.toString();
        }
    }
    catch (err) {
        console.error(err);
    }
}
form.addEventListener("submit", async (b) => {
    b.preventDefault();
    try {
        const formData = new FormData(form);
        const response = await fetch('http://localhost:3000/protectedProducts/postProducts', {
            method: "POST",
            body: formData,
            credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.error.code === "NO_CREDENTIALS")
                openUserAuthWindow();
            else if (data.error.code === "PRODUCT_ALREADY_EXISTS")
                productExistsErrorWindow.showModal();
            else
                invalidValueErrorWindow.showModal();
        }
        else {
            form.reset();
        }
    }
    catch (err) {
        console.error(err);
    }
});
document.addEventListener("DOMContentLoaded", (e) => loadNextId());
//# sourceMappingURL=productForm.js.map