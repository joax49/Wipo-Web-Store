import { handleAddToCart } from "./cart.js";

//Selecting the HTML elements
const productDisplay = document.getElementById("product-display") as HTMLDivElement;
const previousPageButton = document.getElementById("page-selector__previous-page") as HTMLButtonElement;
const nextPageButton = document.getElementById("page-selector__next-page") as HTMLButtonElement;
const displayPage = document.getElementById("page-selector__page-indicator") as HTMLElement;
const searchForm = document.getElementById("search-form") as HTMLFormElement;

//Selecting the HTML elements for the item filters
const formNameElement = document.getElementById("search-form__name") as HTMLInputElement;
const formFloorPriceElement = document.getElementById("search-form__floor-price") as HTMLInputElement;
const formRoofPriceElement = document.getElementById("search-form__roof-price") as HTMLInputElement;
const formTypeElement = document.getElementById("search-form__type") as HTMLInputElement;
const formSubtypeElement = document.getElementById("search-form__subtype") as HTMLInputElement;

//Type alias for the item filter
type ItemFilter = {
    searchedName: string | null;
    floorPrice: number | null;
    roofPrice: number | null;
    type: string | null;
    subtype: string | null;
}

//Function for filling the table with the products
async function fillTable(page: number, filter: ItemFilter) {

    let url = "http://localhost:3000/products/getProducts/query?";

    //Checking if the filter "name" filter exist
    if (filter.searchedName) url += "searchedProduct=" + filter.searchedName;

    //Checking if the exists
    //If it does, it will check if there is a previous filter added in the url, so it can add a "&" of the filter
    if (filter.floorPrice) url[url.length - 1] === "?" ? url += "floorPrice=" + String(filter.floorPrice) : url += "&floorPrice=" + String(filter.floorPrice);
    if (filter.roofPrice) url[url.length - 1] === "?" ? url += "roofPrice=" + String(filter.roofPrice) : url += "&roofPrice=" + String(filter.roofPrice) ;
    if (filter.type) url[url.length - 1] === "?" ? url += "searchedType=" + filter.type : url += "&searchedType=" + filter.type;
    if (filter.subtype) url[url.length - 1] === "?" ? url += "searchedSubtype=" + filter.subtype : url += "&searchedSubtype=" + filter.subtype;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();

        //Creating a fragment for inserting the rows
        const fragment = document.createDocumentFragment();

        //A loop for inserting each element in "data"
        for (let i = 0; i < 20; i++) {
            const element = data[i + (page - 1) * 20];
            if(!element) continue;
            
            const gridItem = document.createElement('div');
            gridItem.classList.add("product-display__item")

            //Insert the data into each element
            const elementName = document.createElement('h3');
            elementName.textContent = element.name;
            const elementPrice = document.createElement('p');
            elementPrice.textContent = "$" + element.price;
            const elementType = document.createElement('p');
            elementType.textContent = element.type;
            const elementSubtype = document.createElement('p');
            elementSubtype.textContent = element.subtype;
            const elementAmount = document.createElement('p');
            elementAmount.textContent = element.amount;
            const elementImage = document.createElement('div');
            elementImage.classList.add("product-images");
            elementImage.innerHTML = `<img src="http://localhost:3000/images/${element.imagepath}" alt="No image available">`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add("add-to-cart-button");
            addToCartButton.dataset.productId = element.id;
            addToCartButton.innerText = "Añadir al carrito";
            addToCartButton.addEventListener("click", () => handleAddToCart(element.id))


            //Inserting each elment into the div
            gridItem.append(elementImage);
            gridItem.append(elementName);
            gridItem.append(elementPrice);
            gridItem.append(elementType);
            gridItem.append(elementSubtype);
            gridItem.append(elementAmount);
            gridItem.append(addToCartButton);

            // //Inserting the rows into the fragment
            fragment.append(gridItem)
        }

        //Appending the fragment to the table body
        if(productDisplay) {
            productDisplay.appendChild(fragment)
        }

    } catch (err) {
        console.error(err)
    }

}

const nullFilter: ItemFilter = {
    searchedName: null,
    floorPrice: null,
    roofPrice: null,
    type: null,
    subtype: null,
}

//Function that returns the current selected page
function getCurrentPage(): number {
    const currentPage = displayPage.innerHTML;
    return Number(currentPage)
}

//Function for obtaining the current filters
function getCurrentFilters(): ItemFilter {
    //The filter elements are all null by default
    let filter: ItemFilter = { ...nullFilter}

    //Getting the filters from the form
    const nameContent = formNameElement.value;
    const floorPriceContent = Number(formFloorPriceElement.value);
    const roofPriceContent = Number(formRoofPriceElement.value);
    const typeContent = formTypeElement.value;
    const subtypeContent = formSubtypeElement.value;

    //Assigning the values to the "filter" object if they are correct
    if (nameContent.length > 0) filter.searchedName = nameContent;
    if (floorPriceContent) filter.floorPrice = floorPriceContent;
    if (roofPriceContent) filter.roofPrice = roofPriceContent;
    if (typeContent.length > 0) filter.type = typeContent;
    if (subtypeContent.length > 0) filter.subtype = subtypeContent;

    return filter
}

//Function for searching specific posters
async function searchPageProducts(changeAmount: number) {
    
    let page = getCurrentPage() + changeAmount;

    //Setting the table empty so it can be filled again
    productDisplay.innerHTML = "";

    if(page < 1) {
        page = 1;
        displayPage.innerHTML = "1";
    }

    await fillTable(page, getCurrentFilters());
    displayPage.innerHTML = String(page);
}

//Event for filling the table once the DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>fillTable(1, nullFilter))

//Events for changing page number
previousPageButton.addEventListener('click', ()=>searchPageProducts(-1))
nextPageButton.addEventListener('click', ()=>searchPageProducts(1))

searchForm.addEventListener('submit', (b)=>{
    b.preventDefault();
    searchPageProducts(0);
});