import * as apiClient from "./apis/clients/firebase/firestore";

export const getOrdersByEmail = async (email) => {
    return await apiClient.getOrdersByEmail(email);
};

export const createOrder = async (orderID, order) => {
    await apiClient.createOrder(orderID, order);
};