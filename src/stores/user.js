import { writable, get as svelteGet } from "svelte/store";

const userStore = writable(JSON.parse(localStorage.getItem("user")) || null);

userStore.subscribe(user => {
    localStorage.setItem("user", JSON.stringify(user));
});

export const {
    subscribe,
    get = () => svelteGet(userStore),
    set,
    update
} = userStore;