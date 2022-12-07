import { useEffect } from "react";
import { auth } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setAuthUser } from "./authUser";

/**
 * use this hook at application startup to observe
 * for changes to the user's sign-in state
 *
 * @returns {void}
 */

export function AuthContext() {

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, authUser => {
            if (authUser) {
                setAuthUser({
                    uid: authUser.uid,
                    email: authUser.email
                });
            } else {
                authUser.set(authUser);
            }
        });
        return unsub;
    }, []);

}