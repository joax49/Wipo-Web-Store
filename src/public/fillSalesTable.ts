const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;

async function fillSalesTable() {
    try {
        const fragment = document.createDocumentFragment();
        const response = await fetch('http://localhost:3000/sales/allSales');

        if (!response.ok) {
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        const sales = data.sales;

        for (let i = 0; i < sales.length; i++) {
            const sale = sales[i];

            const row = document.createElement('tr');

            const idElement = document.createElement('td');
            idElement.innerText = String(sale.id);
            const productNameElement = document.createElement('td');
            productNameElement.innerText = sale.name;
            const amountElement = document.createElement('td');
            amountElement.innerText = String(sale.amount);
            const priceElement = document.createElement('td');
            priceElement.innerText = String(sale.price);
            const dateElement = document.createElement('td');
            dateElement.innerText = String(sale.date);

            row.appendChild(idElement);
            row.appendChild(productNameElement);
            row.appendChild(amountElement);
            row.appendChild(priceElement);
            row.appendChild(dateElement);

            fragment.append(row)
        }

        tableBody.appendChild(fragment);
    } catch (err) {
        console.error(err)
    }

}

document.addEventListener('DOMContentLoaded', () => fillSalesTable())