import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/firebase";

export const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
        uid: userCredential.user.uid,
        email: userCredential.user.email
    };
};