export class CartService {
    key = "cart";
    // Returns all items in the cart
    getAll() {
        const raw = sessionStorage.getItem(this.key);
        if (!raw) {
            return [];
        }
        try {
            return JSON.parse(raw);
        }
        catch (err) {
            console.error("Invalid cart JSON");
            return [];
        }
    }
    // Adds an item
    add(newItem) {
        if (!sessionStorage.getItem(this.key)) {
            sessionStorage.setItem("cart", "[]");
        }
        try {
            const cart = this.getAll();
            let isItemInCart = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === newItem.id) {
                    cart[i].amount += 1;
                    sessionStorage.setItem(this.key, JSON.stringify(cart));
                    return;
                }
            }
            cart.push(newItem);
            sessionStorage.setItem(this.key, JSON.stringify(cart));
        }
        catch (err) {
            console.error("Couldn't add item");
        }
    }
    //Rempves item by index
    remove(index) {
        const cart = this.getAll();
        cart.splice(index, 1);
        sessionStorage.setItem(this.key, JSON.stringify(cart));
    }
    // Clears the cart completely
    clear() {
        sessionStorage.setItem("cart", "[]");
    }
}
//# sourceMappingURL=cartService.js.map