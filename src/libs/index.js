import { typesenseClient } from "./typesense";

export const fetchProducts = async (query) => {
    const result = await typesenseClient
                            .collections("products")
                            .documents()
                            .search(query);
    console.log(result.hits);
    return result.hits.map(hit => ({
        ...hit.document,
        highlights: hit.highlights
    }));
};