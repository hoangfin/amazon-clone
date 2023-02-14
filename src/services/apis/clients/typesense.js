import { Client } from "typesense";

const typesenseClient = new Client({
    "nodes": [{
        "host": "134.209.242.202",
        "port": "8108",
        "protocol": "http"
    }],
    "apiKey": "vD8ddEaESa3Vx2IgSExPOd3uZteIAKWO",
    "connectionTimeoutSeconds": 5
});

export const getProductByID = async (productID) => {
    if (!productID) {
        return Promise.reject(new Error("productID is undefined"));
    }

    const query = { q: "*", filter_by: `productID:=${productID}` };
    const result = await typesenseClient
                            .collections("products")
                            .documents()
                            .search(query);
    return result.found
        ?   result.hits[0].document
        :   Promise.reject(
                new Error(`Couldn't find product with given ID: ${productID}`)
            );
};

export const getProductsByQuery = async (query) => {
    const result = await typesenseClient
                            .collections("products")
                            .documents()
                            .search(query);
    return result.found
        ?   result.hits.map(hit => ({
                ...hit.document,
                highlights: hit.highlights
            }))
        :   [];
};