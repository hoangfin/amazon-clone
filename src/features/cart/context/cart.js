import { get, writable } from "svelte/store";

const cart = writable([]);

// project->features->cart scope exports
export const getCart = () => get(cart);
export const subscribe = cart.subscribe;

// global scope exports
export const setCart = newCart => cart.set(newCart);