const form = document.getElementById("newProduct");
// const button = document.getElementById("submitProduct") as HTMLButtonElement;
// const nameInput = document.getElementById("productName") as HTMLInputElement;
// const priceInput = document.getElementById("productPrice") as HTMLInputElement;
// const typeInput = document.getElementById("productType") as HTMLInputElement;
// const subtypeInput = document.getElementById("productSubtype") as HTMLInputElement;
// const amountInput = document.getElementById("productAmount") as HTMLInputElement;
// const fileInput = document.getElementById("productFile") as HTMLInputElement;
const modalWindow = document.querySelector('dialog');
form.addEventListener("submit", async (b) => {
    b.preventDefault();
    try {
        const formData = new FormData(form);
        // let providedImage: File | string;
        // if(fileInput.files) {
        //     providedImage = fileInput.files[0]
        // }
        // else {
        //     providedImage = "No image provided"
        // }
        // formData.append("productName", nameInput.value);
        // formData.append("productPrice", priceInput.value);
        // formData.append("productType", typeInput.value);
        // formData.append("productSubtype", subtypeInput.value);
        // formData.append("productAmount", amountInput.value);
        // formData.append("image", providedImage);
        // let product = {
        //     "productName": nameInput.value, "productPrice": priceInput.value,
        //     "productType": typeInput.value, "productSubtype": subtypeInput.value,
        //     "productAmount": amountInput.value, 'image': providedImage
        // }
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
    catch (e) {
        console.log(e);
    }
});
export {};
//# sourceMappingURL=productForm.js.map