const modalWindow = document.querySelector('dialog');
const cartForm = document.getElementById("cart__form");
const nameInput = document.getElementById("cart__product-finder");
const amountInput = document.getElementById("cart__product-amount");
const tableBody = document.getElementById('cart__table-body');
const totalExpenseElement = document.getElementById("total-expense");
const buyingButton = document.getElementById('cart__buy-button');
cartForm.addEventListener('submit', async (b) => {
    b.preventDefault();
    try {
        const amount = Number(amountInput.value);
        if (typeof amount === "undefined" || amount < 1) {
            throw new Error("The amount of posters is less than 1");
        }
        const response = await fetch('http://localhost:3000/protectedProducts/addToCart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "product": nameInput.value })
        });
        if (!response.ok) {
            modalWindow.showModal();
        }
        else {
            const data = await response.json();
            const row = document.createElement('tr');
            sessionStorage.setItem(String(sessionStorage.length + 1), JSON.stringify(data));
            //
            let posterPrice = 0;
            if (typeof data.price === "number") {
                posterPrice = data.price;
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
    }
    catch (err) {
        console.log(err);
    }
});
buyingButton.addEventListener('click', async () => {
    let allItems = [];
    for (let i = 1; i <= sessionStorage.length; i++) {
        const item = sessionStorage.getItem(String(i));
        if (item) {
            allItems.push(item);
        }
    }
    const response = await fetch('http://localhost:3000/protectedProducts/sellItems', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: allItems }),
        credentials: 'include'
    });
    console.log(response);
    //Clearing the items
    if (response.ok) {
        sessionStorage.clear();
        tableBody.innerHTML = "";
    }
});
export {};
//# sourceMappingURL=cart.js.map