import { useEffect, useState } from "react";

export const useStore = (store) => {
    const [value, setValue] = useState(() => store.get());

    useEffect(() => store.subscribe(setValue), [store]);

    return [value];
};
