import { memo } from "react";
import { useStore, cartStore } from "stores";
import emptyCartIcon from "./images/empty-cart.svg";
import styles from "./empty-cart.module.css";

const Component = ({ className }) => {
    const [cart] = useStore(cartStore);

    if (cart.length) return null;

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <h1>Your Amazon Cart is empty</h1>
            <img src={emptyCartIcon} />
        </div>
    );
};

export const EmptyCart = memo(Component);