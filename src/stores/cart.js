import { writable, get as svelteGet } from "svelte/store";

const cartStore = writable(JSON.parse(localStorage.getItem("cart")) || []);

cartStore.subscribe(items => {
    localStorage.setItem("cart", JSON.stringify(items))
});

export const get = () => svelteGet(cartStore);
export const { subscribe, set } = cartStore;

/**
 *
 * @param    {Object} item
 * @property {String} item.id
 * @property {String} item.imageURL
 * @property {String} item.title
 * @property {Number} item.price
 *
 */
export const add = (item, quantity) => {
    const { id } = item;
    cartStore.update(items => {
        const index = items.findIndex(item => item.id === id);
        if (index === -1) return [...items, { ...item, quantity }];

        items[index] = {
            ...items[index],
            quantity: items[index].quantity + quantity
        };

        return [...items];
    });
};

export const update = (id, itemField) => {
    const index = svelteGet(cartStore).findIndex(item => item.id === id);
    if (index === -1) {
        throw new Error(`Couldn't update non-existent item "${id}"`);
    }
    cartStore.update(items => {
        items[index] = { ...items[index], ...itemField };
        return [...items];
    });
};

/**
 * @param {String} id item ID to be removed
 */
export const remove = id => {
    const index = svelteGet(cartStore).findIndex(item => item.id === id);
    if (index === -1) {
        throw new Error(`Couldn't remove non-existent item "${id}"`);
    }
    cartStore.update(items => items.filter((_, idx) => idx !== index));
};

console.log("cart store loaded");