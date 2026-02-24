const editPriceForm = document.getElementById('price-edit-form');
editPriceForm.addEventListener('submit', async (b) => {
    b.preventDefault();
    try {
        const formData = new FormData(editPriceForm);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch('http://localhost:3000/protectedProducts/editPrices', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok)
            editPriceForm.reset();
    }
    catch (err) {
        console.error(err);
    }
});
export {};
//# sourceMappingURL=editPrices.js.map