import { auth } from "./config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase
} from "firebase/auth";

export const register = async (email, password) => {
    if (!email || !password) {
        return Promise.reject(new Error("email or password is undefined"));
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email
    };
    return user;
};

export const signIn = async (email, password) => {
    if (!email || !password) {
        return Promise.reject(new Error("email or password is undefined"));
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email
    };
    return user;
};

export const signOut = async () => {
    await signOutFirebase(auth);
};