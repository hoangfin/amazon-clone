import { useEffect, useState } from "react";
import { writable, get } from "svelte/store";

const authUser = writable(null);

export const setAuthUser = user => authUser.set(user);

// custom hook useCurrentUser
export function useAuthUser() {
    const [user, setUser] = useState(() => get(authUser));

    useEffect(() => {
        const unsub = authUser.subscribe(setUser);
        return () => unsub();
    }, []);

    return user;
}