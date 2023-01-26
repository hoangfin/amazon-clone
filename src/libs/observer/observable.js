import { writable, get } from "svelte/store";

export const observable = target => {
    const proxy = writable(target);
    return { get: () => get(proxy), ...proxy };
};