import { useEffect } from "react";
import { setCart } from "./cart";
import { useCart } from "../hooks";

export function CartContext({ cartValue }) {

    const cart = useCart();

    useEffect(() => {
        setCart(cartValue);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return null;

}