import { CartItem } from "../source/database/typeCasting.js";
import { CartService } from "./cartService.js";

const modalWindow = document.querySelector('dialog') as HTMLDialogElement;

const cartForm = document.getElementById("cart__form") as HTMLFormElement;
const nameInput = document.getElementById("cart__product-finder") as HTMLInputElement;
const amountInput = document.getElementById("cart__product-amount") as HTMLInputElement;

const tableBody = document.getElementById('cart__table-body') as HTMLElement;
const totalExpenseElement = document.getElementById("total-expense") as HTMLTableCellElement;

const buyingButton = document.getElementById('cart__buy-button') as HTMLButtonElement;

const cart = new CartService();

//Event for listing products into the cart
cartForm.addEventListener('submit', async (b) => {
    b.preventDefault();

    try {

        // Getting the amount the user submited
        const amount = Number(amountInput.value);
        // Making sure the user inserted an integer above 0
        if (typeof amount === "undefined" || amount < 1) {
            throw new Error("The amount of posters is less than 1")
        }

        // Fetching the searched item
        const response = await fetch('http://localhost:3000/protectedProducts/addToCart',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"productName": nameInput.value})
            }
        )

        if(!response.ok) {
            modalWindow.showModal()
        }

        else {
            const data = await response.json();

            // Variable holding the amount of items the user requested
            let requestedAmount = Number(amountInput.value);
            // Error in case the user requested an item that is out of stock
            if (data.amount <= 0) throw new Error("Out of stock");
            // If the user requested more items than there is
            if (requestedAmount > data.amount) requestedAmount = data.amount;

            const item: CartItem = {
                id: data.id,
                name: data.name,
                price: data.price,
                amount: requestedAmount
            }

            const row = document.createElement('tr');
            cart.add(item);

            let posterPrice = 0;
            if (typeof data.price === "number") {
                posterPrice = data.price
            }

            //Updating the total amount of the expense
            let totalExpense = Number(totalExpenseElement.innerText.slice(1));
            totalExpense += amount * posterPrice;
            if (typeof String(totalExpense) === "string") {
                totalExpenseElement.innerText = "$" + String(totalExpense);
            }

            //Insert the data into each column
            const elementName = document.createElement('td');
            elementName.textContent = data.name;
            const elementAmount = document.createElement('td');
            elementAmount.textContent = amountInput.value;
            const elementPrice = document.createElement('td');
            elementPrice.textContent = "$" + posterPrice;

            row.appendChild(elementName);
            row.appendChild(elementAmount);
            row.appendChild(elementPrice);

            tableBody.appendChild(row);
        }

    } catch (err) {
        console.log(err)
    }
})

//Event for when the user buys the products they listed
buyingButton.addEventListener('click', async () => {

    const allItems = cart.getAll();

    const response = await fetch('http://localhost:3000/protectedProducts/sellItems',
        {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({items: allItems}),
            credentials: 'include'
        }
    )

    //Clearing the items
    if(response.ok) {
        cart.clear();
        tableBody.innerHTML = "";
        totalExpenseElement.innerText = "0";
    }
})