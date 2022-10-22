import { useEffect, useState } from "react";
import { writable, get } from "svelte/store";

//#region useCurrentUser custom hook
const currentUser = writable(null);

export function useCurrentUser() {
    const [value, setValue] = useState(() => get(currentUser));

    useEffect(() => {
        const unsub = currentUser.subscribe(setValue);
        return () => unsub();
    }, []);

    return [value, currentUser.update];
}
//#endregion useCurrentUser