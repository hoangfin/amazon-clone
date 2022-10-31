import { useEffect, useState } from "react";
import { writable, get } from "svelte/store";

const
    currentUser = writable(null),
    shoppingCart = writable([]);
    /* shoppingCart = writable(
        JSON.parse(sessionStorage.getItem("shopping-cart")) || []
    ); */

export const setCurrentUser = user => currentUser.set(user);

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

export function useCurrentUser() {
    const [value, setValue] = useState(() => get(currentUser));

    useEffect(() => {
        const unsub = currentUser.subscribe(setValue);
        return () => unsub();
    }, []);

    return value;
}

export function useShoppingCart() {
    const [value, setValue] = useState(() => get(shoppingCart));

    useEffect(() => {
        const unsub = shoppingCart.subscribe(setValue);
        return () => unsub();
    }, []);

    return value;
}