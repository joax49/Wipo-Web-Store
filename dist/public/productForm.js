const form = document.getElementById("newProduct");
const modalWindow = document.querySelector('dialog');
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
export {};
//# sourceMappingURL=productForm.js.map