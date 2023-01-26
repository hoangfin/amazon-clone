import { memo } from "react";
import { Header } from "../commons";
import { EmptyCart, ShoppingCart, SubTotal } from "./components";
import styles from "./checkout.module.css";

const Component = () => {

    return (
        <div className={styles.root}>
            <Header className={styles.header} />
            <EmptyCart />
            <ShoppingCart />
            <SubTotal />
        </div>
    );
};

export const Checkout = memo(Component);
