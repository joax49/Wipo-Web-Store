const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', async (b) => {
    b.preventDefault();
    try {
        const formData = new FormData(editForm);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch('http://localhost:3000/protectedProducts/editProducts', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
    catch (err) {
        console.error(err);
    }
});
export {};
//# sourceMappingURL=editProduct.js.map