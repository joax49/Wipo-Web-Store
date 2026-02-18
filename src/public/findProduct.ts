import { json } from "express";

const searchForm = document.getElementById('search-form') as HTMLFormElement;

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
            console.log(data);
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

        fetchProduct(productName)
    } catch (err) {
        console.error(err);
    }
})