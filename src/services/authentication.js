import * as apiClient from "./apis/clients/firebase/authentication";
import { createUser, getUserByID } from "services/user";

export const register = async (email, password) => {
    const user = await apiClient.register(email, password);
    return await createUser(user.id, { ...user, shippingInfo: null });
};

export const signIn = async (email, password) => {
    const user = await apiClient.signIn(email, password);
    return await getUserByID(user.id);
};

export const signOut = async (callback) => {
    await apiClient.signOut(callback);
};