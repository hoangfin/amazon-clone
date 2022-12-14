import { get, writable } from "svelte/store";

const cart = writable([]);

// project->features->cart scope exports
export const getCart = () => get(cart);
export const subscribe = cart.subscribe;

// global scope exports
export const setCart = newCart => cart.set(newCart);

export const updateItemQuantity = (itemID, newQuantity) => {
    const currentCart = getCart();
    const index = currentCart.findIndex(item => item.id === itemID);

    if (index === -1) {
        throw new Error(`Item ${itemID} does not exist`);
    }

    const newCart = [...currentCart];
    newCart[index] = { ...newCart[index], quantity: newQuantity };
    cart.set(newCart);
};

export const removeCartItem = (itemID) => {
    const currentCart = getCart();
    const index = currentCart.findIndex(item => item.id === itemID);

    if (index === -1) {
        throw new Error(`Item ${itemID} does not exist`);
    }

    const newCart = currentCart.filter((_, i) => index !== i);
    cart.set(newCart);
};

export const addProductToCart = product => {
    cart.update(currentCart => {
        const newCart = [...currentCart];
        const index = newCart.findIndex(cartProduct => cartProduct.id === product.id);
        if (index === -1) {
            newCart.push(product);
        } else {
            newCart[index].quantity += product.quantity;
        }
        return newCart;
    });
};