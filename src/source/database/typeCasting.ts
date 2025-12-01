// Type alias for the product objects once they are stored as variables
export type Product = {
    id: number;
    name: string;
    price: number;
    type: string;
    subtype: string;
    amount: number;
    imagePath: string;
}


// Type alias for the items of the cart
export type CartItem = {
    id: number;
    name: string;
    price: number;
    amount: number;
}

// Type guard for the CartItem alias
export function isCartItem(item: any): item is CartItem {
    return (
        item && 
        typeof item === "object" &&
        typeof item.id === "number" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number"
    )
}

// Type alias for sales
export type Sale = {
    id: number;
    productId: number;
    productName: string;
    amount: number;
    price: number;
    date: string;
}