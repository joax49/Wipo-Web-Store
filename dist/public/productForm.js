const form = document.getElementById("newProduct");
const modalWindow = document.querySelector('dialog');
const nextIdIndicator = document.getElementById('next-id-indicator');
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
            nextIdIndicator.innerText = id.id.toString();
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
        if (!response.ok) {
            modalWindow.showModal();
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
export {};
//# sourceMappingURL=productForm.js.map