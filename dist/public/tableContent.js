//Selecting the HTML elements
const tableBody = document.querySelector('tbody');
const previousPageButton = document.getElementById("page-selector__previous-page");
const nextPageButton = document.getElementById("page-selector__next-page");
const displayPage = document.getElementById("page-selector__page-indicator");
const searchForm = document.getElementById("search-form");
//Selecting the HTML elements for the item filters
const formNameElement = document.getElementById("search-form__name");
const formFloorPriceElement = document.getElementById("search-form__floor-price");
const formRoofPriceElement = document.getElementById("search-form__roof-price");
const formTypeElement = document.getElementById("search-form__type");
const formSubtypeElement = document.getElementById("search-form__subtype");
//Function for filling the table with the products
async function fillTable(page, filter) {
    let url = "http://localhost:3000/products/getProducts/query?";
    //Checking if the filter "name" filter exist
    if (filter.searchedName)
        url += "searchedProduct=" + filter.searchedName;
    //Checking if the exists
    //If it does, it will check if there is a previous filter added in the url, so it can add a "&" of the filter
    if (filter.floorPrice)
        url[url.length - 1] === "?" ? url += "floorPrice=" + String(filter.floorPrice) : url += "&floorPrice=" + String(filter.floorPrice);
    if (filter.roofPrice)
        url[url.length - 1] === "?" ? url += "roofPrice=" + String(filter.roofPrice) : url += "&roofPrice=" + String(filter.roofPrice);
    if (filter.type)
        url[url.length - 1] === "?" ? url += "searchedType=" + filter.type : url += "&searchedType=" + filter.type;
    if (filter.subtype)
        url[url.length - 1] === "?" ? url += "searchedSubtype=" + filter.subtype : url += "&searchedSubtype=" + filter.subtype;
    console.log(url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        //Creating a fragment for inserting the rows
        const fragment = document.createDocumentFragment();
        //A loop for inserting each element in "data"
        for (let i = 0; i < 20; i++) {
            const element = data[i + (page - 1) * 20];
            if (!element)
                continue;
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
            elementImage.innerHTML = `<img src="http://localhost:3000/images/${element.imagepath}" alt="No image available">`;
            ;
            //Inserting columns into the row
            row.append(elementId);
            row.append(elementName);
            row.append(elementPrice);
            row.append(elementType);
            row.append(elementSubtype);
            row.append(elementAmount);
            row.append(elementImage);
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
const nullFilter = {
    searchedName: null,
    floorPrice: null,
    roofPrice: null,
    type: null,
    subtype: null,
};
//Function that returns the current selected page
function getCurrentPage() {
    const currentPage = displayPage.innerHTML;
    return Number(currentPage);
}
//Function for obtaining the current filters
function getCurrentFilters() {
    //The filter elements are all null by default
    let filter = nullFilter;
    //Getting the filters from the form
    const nameContent = formNameElement.value;
    const floorPriceContent = Number(formFloorPriceElement.value);
    const roofPriceContent = Number(formRoofPriceElement.value);
    const typeContent = formTypeElement.value;
    const subtypeContent = formSubtypeElement.value;
    //Assigning the values to the "filter" object if they are correct
    if (nameContent.length > 0)
        filter.searchedName = nameContent;
    if (floorPriceContent)
        filter.floorPrice = floorPriceContent;
    if (roofPriceContent)
        filter.roofPrice = roofPriceContent;
    if (typeContent.length > 0)
        filter.type = typeContent;
    if (subtypeContent.length > 0)
        filter.subtype = subtypeContent;
    return filter;
}
//Function for searching specific posters
async function searchPageProducts(changeAmount) {
    let page = getCurrentPage() + changeAmount;
    //Setting the table empty so it can be filled again
    tableBody.innerHTML = "";
    if (page < 1) {
        page = 1;
        displayPage.innerHTML = "1";
    }
    await fillTable(page, getCurrentFilters());
    displayPage.innerHTML = String(page);
}
//Event for filling the table once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => fillTable(1, nullFilter));
//Events for changing page number
previousPageButton.addEventListener('click', () => searchPageProducts(-1));
nextPageButton.addEventListener('click', () => searchPageProducts(1));
searchForm.addEventListener('submit', (b) => {
    b.preventDefault();
    searchPageProducts(0);
});
export {};
//# sourceMappingURL=tableContent.js.map