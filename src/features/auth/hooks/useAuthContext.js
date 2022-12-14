import { useEffect, useState } from "react";
import { getAuthUser, subscribe } from "../context/authUser";

export function useAuthContext() {
    const [authUser, setAuthUser] = useState(() => getAuthUser());

    useEffect(() => {
        const unsub = subscribe(setAuthUser);
        return unsub;
    }, []);

    return authUser;
}