import userEvent from "@testing-library/user-event";
import * as apiClient from "./apis/clients/firebase/authentication";

export const register = async (email, password) => {
    return await apiClient.register(email, password);
};

export const signIn = async (email, password) => {
    return await apiClient.signIn(email, password);
};

export const signOut = async (callback) => {
    await apiClient.signOut(callback);
};