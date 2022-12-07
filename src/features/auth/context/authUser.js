import { get, writable } from "svelte/store";

const authUser = writable(null);



export const getAuthUser = () => get(authUser);
export const subscribe = authUser.subscribe;
export const setAuthUser = user => authUser.set(user);