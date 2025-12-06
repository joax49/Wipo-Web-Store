import { CartService } from "./cartService.js";
const modalWindow = document.querySelector('dialog');
const tableBody = document.getElementById('cart__table-body');
const totalExpenseElement = document.getElementById("total-expense");
const buyingButton = document.getElementById('cart__buy-button');
const cart = new CartService();
// Function for loading the cart's content in the display
export async function loadCartItems() {
    tableBody.innerHTML = "";
    const cartItems = cart.getAll();
    let totalExpense = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        totalExpense += cartItem.price * cartItem.amount;
        totalExpenseElement.innerText = "$" + String(totalExpense);
        const row = document.createElement('tr');
        //Insert the data into each column
        const elementName = document.createElement('td');
        elementName.textContent = cartItem.name;
        const elementAmount = document.createElement('td');
        elementAmount.textContent = String(cartItem.amount);
        const elementPrice = document.createElement('td');
        elementPrice.textContent = "$" + String(cartItem.price);
        //Inserting data into the row
        row.appendChild(elementName);
        row.appendChild(elementAmount);
        row.appendChild(elementPrice);
        tableBody.appendChild(row);
    }
}
// Function for adding items into the cart
export async function handleAddToCart(productId) {
    try {
        // Fetching the searched item
        const response = await fetch('http://localhost:3000/protectedProducts/addToCart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "productId": productId })
        });
        const data = await response.json();
        const item = {
            id: data.id,
            name: data.name,
            price: data.price,
            amount: 1
        };
        cart.add(item);
        loadCartItems();
    }
    catch (err) {
        console.log(err);
    }
}
//Event for when the user buys the products they listed
buyingButton.addEventListener('click', async () => {
    const allItems = cart.getAll();
    const response = await fetch('http://localhost:3000/protectedProducts/sellItems', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: allItems }),
        credentials: 'include'
    });
    if (!response.ok) {
        modalWindow.showModal();
        return;
    }
    //Clearing the items
    else {
        cart.clear();
        tableBody.innerHTML = "";
        totalExpenseElement.innerText = "0";
    }
});
document.addEventListener('DOMContentLoaded', () => sessionStorage.clear());
//# sourceMappingURL=cart.js.map