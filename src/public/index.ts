import {getFavoriteItems} from './index_api.js';

//Function for populating the best items div inside main
async function populateBestItems() {

    const bestItemsBox = document.getElementById('best-items');

    const favoriteItems = await getFavoriteItems();
    let favItem: Object;

    const fragment = new DocumentFragment();

    for (let i = 0; i < 8; i++) {

        favItem = favoriteItems[i];

        const bestItem = document.createElement('div');
        bestItem.classList.add("best-items__item");

        const title = document.createElement('h3');
        const price = document.createElement('p');

        const imageContainer = document.createElement('div');
        const image = document.createElement('img');
        imageContainer.append(image);

        bestItem.append(title, price, imageContainer);
        fragment.append(bestItem);
    }

    if (!bestItemsBox) {
        throw new Error('The HTML element is null')
    }
    else {
        bestItemsBox.append(fragment);
    }
}