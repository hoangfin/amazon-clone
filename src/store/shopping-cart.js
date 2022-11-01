import { useEffect, useState } from "react";
import { writable, get } from "svelte/store";

const shoppingCart = writable([]);
/* shoppingCart = writable(
        JSON.parse(sessionStorage.getItem("shopping-cart")) || []
    ); */

export const addToShoppingCart = product => {
    shoppingCart.update(cart => {
        const newCart = [...cart];
        const i = newCart.findIndex(cartItem => cartItem.id === product.id);
        if (i !== -1) {
            newCart[i] = product;
        } else {
            newCart.push(product);
        }
        return newCart;
    });
};

export const clearShoppingCart = () => shoppingCart.set([]);

export function useShoppingCart() {
    const [value, setValue] = useState(() => get(shoppingCart));

    useEffect(() => {
        const unsub = shoppingCart.subscribe(setValue);
        return () => unsub();
    }, []);

    return value;
}