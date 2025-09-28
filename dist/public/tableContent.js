const tableBody = document.querySelector('tbody');
async function fillTable() {
    try {
        const response = await fetch('http://localhost:3000/products/getProducts/query');
        if (!response.ok) {
            throw new Error('Could not fetch resource');
        }
        const data = await response.json();
        console.log(data);
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const row = document.createElement('tr');
            const elementId = document.createElement('td');
            elementId.textContent = element.id;
            const elementName = document.createElement('td');
            elementName.textContent = element.name;
            const elementPrice = document.createElement('td');
            elementPrice.textContent = element.price;
            row.append(elementId);
            row.append(elementName);
            row.append(elementPrice);
            fragment.append(row);
        }
        if (tableBody) {
            tableBody.appendChild(fragment);
        }
    }
    catch (error) {
        console.log(error);
    }
}
document.addEventListener('DOMContentLoaded', () => fillTable());
export {};
//# sourceMappingURL=tableContent.js.map