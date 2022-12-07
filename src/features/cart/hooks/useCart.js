import { useEffect, useState } from "react";
import { getCart, subscribe } from "../context/cart";

export function useCart() {
    const [cart, setCart] = useState(() => getCart());

    useEffect(() => {
        const unsub = subscribe(setCart);
        return unsub;
    }, []);

    return cart;
}
