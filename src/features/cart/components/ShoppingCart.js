import { useCartContext } from "../hooks";
import { Subtotal } from "./Subtotal";
import { CartItem } from "./CartItem";
import styles from "./shopping-cart.module.css";

export const ShoppingCart = ({ onCheckout, className }) => {
    const cart = useCartContext();

    console.log("ShoppingCart");
    console.log(cart);

    if (cart.length === 0) {
        return (
            <div className={styles["empty-cart"]}>
                <h1>Your Amazon Cart is empty</h1>
                <img src="/empty-cart.svg" />
            </div>
        );
    }

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <Subtotal
                className={styles.subtotal}
                onCheckout={onCheckout}
            />

            <div className={styles["cart-section"]}>
                <h1 className={styles["cart-title"]}>Shopping Cart</h1>
                <ul>
                    {cart.map(product =>
                        <li className={styles["cart-list-item"]} key={product.id}>
                            <CartItem className={styles["cart-item"]} item={product} />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );

};
