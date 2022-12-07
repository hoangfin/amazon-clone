import { signOut as logOut } from "firebase/auth";
import { auth } from "config/firebase";

export const signOut = async (callback) => {
    await logOut(auth);
    if (callback && typeof callback === "function") {
        callback();
    }
};