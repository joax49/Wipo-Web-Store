// Type guard for the CartItem alias
export function isCartItem(item) {
    return (item &&
        typeof item === "object" &&
        typeof item.id === "number" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number");
}
//# sourceMappingURL=typeCasting.js.map