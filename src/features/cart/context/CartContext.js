import { useEffect } from "react";
import { setCart } from "../cart";
import { useCartContext } from "../hooks";

export const CartContext = ({ cartValue }) => {

    const cart = useCartContext();

    useEffect(() => {
        setCart(cartValue);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return null;
    
};