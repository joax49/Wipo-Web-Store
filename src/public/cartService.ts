import { CartItem } from "../source/database/typeCasting.js"; 

export class CartService {
    private key = "cart";

    // Returns all items in the cart
    getAll(): CartItem[] {
        const raw = sessionStorage.getItem(this.key)
        if(!raw) {
            return []
        }
        try {
            return JSON.parse(raw) as CartItem[]
        } catch (err) {
            console.error("Invalid cart JSON");
            return []
        }
    }

    // Adds an item
    add(item: CartItem): void {

        if(!sessionStorage.getItem(this.key)) {
            sessionStorage.setItem("cart", "[]")
        }

        try {
            const cart = this.getAll();
            cart.push(item);
            sessionStorage.setItem(this.key, JSON.stringify(cart));
        } catch(err) {
            console.error("Couldn't add item")
        }
    } 

    //Rempves item by index
    remove(index: number): void {
        const cart = this.getAll();
        cart.splice(index, 1);
        sessionStorage.setItem(this.key, JSON.stringify(cart));
    }

    // Clears the cart completely
    clear(): void {
        sessionStorage.setItem("cart", "[]");
    }
}