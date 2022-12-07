import { fetchProducts } from "libs";

export const getProducts = async (query) => {
    return await fetchProducts(query);
};