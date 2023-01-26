import { memo } from "react";
import { useStore, cartStore } from "stores";
import { CartItem } from "./CartItem";
import styles from "./shopping-cart.module.css";

const Component = ({ className }) => {
    const [cart] = useStore(cartStore);

    if (cart.length === 0) {
        return null;
    }

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <h1 className={styles["cart-title"]}>Shopping Cart</h1>
            <ul>
                {cart.map(cartItem =>
                    <li className={styles["cart-list-item"]} key={cartItem.id}>
                        <CartItem
                            className={styles["cart-item"]}
                            item={cartItem}
                        />
                    </li>
                )}
            </ul>
        </div>
    );

};

export const ShoppingCart = memo(Component);