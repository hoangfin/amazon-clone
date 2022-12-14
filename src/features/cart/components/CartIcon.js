import { Link } from "react-router-dom";
import { useCartContext } from "../hooks";
import { getCartQuantity } from "../utils";
import styles from "./cart-icon.module.css";

export const CartIcon = () => {

    const cart = useCartContext();

    return (
        <Link to="/checkout" className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 20 20">
                <use xlinkHref="/sprites.svg#cart" />
            </svg>
            <span className={styles.quantity}>{getCartQuantity(cart)}</span>
        </Link>
    )
};