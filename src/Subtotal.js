import React from "react";
import styles from "./subtotal.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import {
    useAuthUser,
    useShoppingCart,
    getShoppingCartQuantity,
    getShoppingCartSum
} from "./store";

function Subtotal() {

    const authUser = useAuthUser();
    const shoppingCart = useShoppingCart();
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <p>
                Subtotal ({getShoppingCartQuantity(shoppingCart)} items):
                &#160;<strong>&#36;{getShoppingCartSum(shoppingCart)}</strong>
            </p>
            <small className={styles.gift}>
                <input type="checkbox" /> This order contains a gift
            </small>

            <Button
                type="button"
                onClick={() => navigate(authUser ? "/payment" : "/login")}>
                Proceed to Checkout
            </Button>
        </div>
    )
}

export default Subtotal;