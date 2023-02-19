import { writable, get as svelteGet } from "svelte/store";

const userStore = writable(JSON.parse(localStorage.getItem("user")) || null);

userStore.subscribe(user => {
    localStorage.setItem("user", JSON.stringify(user));
});

export const get = () => svelteGet(userStore);
export const { subscribe, set } = userStore;

export const update = (id, field) => {
    if (svelteGet(userStore).id !== id) {
        return;
    }
    userStore.update(user => ({ ...user, ...field }));
};