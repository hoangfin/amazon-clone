import * as apiClient from "./apis/clients/firebase/firestore";

export const createUser = async (id, user) => {
    return await apiClient.createUser(id, user);
};

export const getUserByID = async (userID) => {
    return await apiClient.getUserByID(userID);
};

export const updateUser = async (userID, data) => {
    await apiClient.updateUser(userID, data);
};