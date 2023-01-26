import { writable, get as svelteGet } from "svelte/store";

const cartStore = writable(
    JSON.parse(localStorage.getItem("cart")) || []
);

cartStore.subscribe(cartValue => {
    localStorage.setItem("cart", JSON.stringify(cartValue))
});

export const { subscribe, get = () => svelteGet(cartStore), set, update } = cartStore;