//Selecting the table
const tableBody = document.querySelector('tbody');
//Function for filling the table with the products
async function fillTable() {
    try {
        const response = await fetch('http://localhost:3000/products/getProducts/query');
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        //Creating a fragment for inserting the rows
        const fragment = document.createDocumentFragment();
        //A loop for inserting each element in "data"
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const row = document.createElement('tr');
            //Insert the data into each column
            const elementId = document.createElement('td');
            elementId.textContent = element.id;
            const elementName = document.createElement('td');
            elementName.textContent = element.name;
            const elementPrice = document.createElement('td');
            elementPrice.textContent = "$" + element.price;
            //Inserting columns into the row
            row.append(elementId);
            row.append(elementName);
            row.append(elementPrice);
            //Inserting the rows into the fragment
            fragment.append(row);
        }
        //Appending the fragment to the table body
        if (tableBody) {
            tableBody.appendChild(fragment);
        }
    }
    catch (error) {
        console.log(error);
    }
}
//Event for filling the table once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => fillTable());
export {};
//# sourceMappingURL=tableContent.js.map