import { json } from "express";

const searchForm = document.getElementById('search-form') as HTMLFormElement;

const nameEditInput = document.getElementById('edit-form__name-editor') as HTMLInputElement;
const priceEditInput = document.getElementById('edit-form__price-editor') as HTMLInputElement;
const typeEditInput = document.getElementById('edit-form__type-editor') as HTMLInputElement;
const subtypeEditInput = document.getElementById('edit-form__subtype-editor') as HTMLInputElement;
const quantityEditInput = document.getElementById('edit-form__quantity-editor') as HTMLInputElement;

async function fetchProduct(name:string) {
    try {

        const response = await fetch('http://localhost:3000/protectedProducts/editProducts',
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"productName" : name}),
            })

        if(!response.ok) {
            console.error("Couldn't find the product")
        }

        else {
            const data = await response.json();
            return data
        }
    } catch (err) {
        console.error(err);
    }
}

searchForm.addEventListener('submit', async (b) =>  {
    b.preventDefault();

    try {

        const formData = new FormData(searchForm);
        const productName = formData.get('productName') as string;

        const data = await fetchProduct(productName)

        nameEditInput.value = data.name;
        priceEditInput.value = data.price;
        typeEditInput.value = data.type;
        subtypeEditInput.value = data.subtype;
        quantityEditInput.value = data.amount;

    } catch (err) {
        console.error(err);
    }
})