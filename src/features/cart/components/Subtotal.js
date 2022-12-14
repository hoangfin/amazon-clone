import { useCartContext } from "../hooks";
import { getCartQuantity, getCartSum } from "../utils";
import styles from "./subtotal.module.css";

export const Subtotal = ({ className, onCheckout }) => {

    const cart = useCartContext();

    console.log("Subtotal");

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <p>
                Subtotal ({getCartQuantity(cart)} items):
                &#160;<strong>&#36;{getCartSum(cart)}</strong>
            </p>
            <small className={styles.gift}>
                <input type="checkbox" /> This order contains a gift
            </small>

            <button
                className={styles.button}
                type="button"
                onClick={() => {console.log("Checkout button clicked"); onCheckout()}}>
                Proceed to Checkout
            </button>
        </div>
    )
};
