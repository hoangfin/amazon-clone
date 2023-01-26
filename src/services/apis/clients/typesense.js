import { Client } from "typesense";

// Mx3ofRw7LrB9yE1RpEi2P3Kwv7ktzqDA
// nuDrGJ7tI2A0wFR5fP7gA3W2geRcngq3
const typesenseClient = new Client({
    "nodes": [{
        "host": "134.209.242.202",
        // "host": "localhost",
        "port": "8108",
        "protocol": "http"
    }],
    "apiKey": "Mx3ofRw7LrB9yE1RpEi2P3Kwv7ktzqDA",
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