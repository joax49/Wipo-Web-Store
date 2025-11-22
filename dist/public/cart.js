const modalWindow = document.querySelector('dialog');
const cartForm = document.getElementById("cart__form");
const nameInput = document.getElementById("cart__product-finder");
const amountInput = document.getElementById("cart__product-amount");
const tableBody = document.getElementById('cart__table-body');
const totalExpenseElement = document.getElementById("total-expense");
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
            body: JSON.stringify({ "product": nameInput.value }),
            credentials: "include"
        });
        if (!response.ok) {
            modalWindow.showModal();
        }
        else {
            const data = await response.json();
            const row = document.createElement('tr');
            let posterPrice = 0;
            if (typeof data.price === "number") {
                posterPrice = data.price;
            }
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
export {};
//# sourceMappingURL=cart.js.map