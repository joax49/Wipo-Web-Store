//Selecting the HTML elements
const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;
const previousPageButton = document.getElementById("page-selector__previous-page") as HTMLButtonElement;
const nextPageButton = document.getElementById("page-selector__next-page") as HTMLButtonElement;
const displayPage = document.getElementById("page-selector__page-indicator") as HTMLElement;

//Type alias for the item filter
type ItemFilter = {
    name: string | null;
    floorPrice: number | null;
    roofPrice: number | null;
    type: string | null;
    subtype: string | null;
}

//Function for filling the table with the products
async function fillTable(page: number, filter: ItemFilter) {
    
    let url = "http://localhost:3000/products/getProducts/query";

    url += "/" + page;
    console.log(url);

    try {
        const response = await fetch(url);
        console.log(response)

        if (!response.ok) {
            throw new Error("Could not fetch resource")
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
            const elementType = document.createElement('td');
            elementType.textContent = element.type;
            const elementSubtype = document.createElement('td');
            elementSubtype.textContent = element.subtype;
            const elementAmount = document.createElement('td');
            elementAmount.textContent = element.amount;
            const elementImage = document.createElement('td');
            elementImage.innerHTML = `<img src="http://localhost:3000/images/${element.imagepath}" alt="No image available">`;;

            //Inserting columns into the row
            row.append(elementId);
            row.append(elementName);
            row.append(elementPrice);
            row.append(elementType);
            row.append(elementSubtype);
            row.append(elementAmount);
            row.append(elementImage);

            //Inserting the rows into the fragment
            fragment.append(row)
        }

        //Appending the fragment to the table body
        if(tableBody) {
            tableBody.appendChild(fragment)
        }


    } catch (error) {
        console.log(error)
    }

}

const loadingFilter = {
    name: null,
    floorPrice: null,
    roofPrice: null,
    type: null,
    subtype: null,
}

async function changePage(changeAmount: number) {
    const currentPage = displayPage.innerHTML;
    console.log(currentPage)
    let currentPageNumber = Number(currentPage) + changeAmount;
    console.log(currentPageNumber)

    tableBody.innerHTML = "";

    if(currentPageNumber <= 0) throw new Error("The page must be at least 1");

    await fillTable(currentPageNumber, loadingFilter);
    displayPage.innerHTML = String(currentPageNumber);
}

//Event for filling the table once the DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>fillTable(1, loadingFilter))
previousPageButton.addEventListener('click', ()=>changePage(-1))
nextPageButton.addEventListener('click', ()=>changePage(1))