import * as apiClient from "./apis/clients/typesense";

export const getProductByID = async (productID) => {
    return await apiClient.getProductByID(productID);
};

export const getProductsByQuery = async (query) => {
    return await apiClient.getProductsByQuery(query);
};