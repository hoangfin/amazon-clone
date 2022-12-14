import { useEffect, useState } from "react";
import { getCart, subscribe } from "../cart";

export const useCartContext = () => {
    const [cart, setCart] = useState(() => getCart());

    useEffect(() => {
        const unsub = subscribe(setCart);
        return unsub;
    }, []);

    return cart;
};
