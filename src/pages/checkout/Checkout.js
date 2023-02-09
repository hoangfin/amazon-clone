import { memo } from "react";
import { Header } from "../commons";
import { EmptyCart, CartItems, SubTotal } from "./components";
import style from "./checkout.module.css";

const Component = () => {

    return (
        <div className={style.root}>
            <Header className={style.header} />
            <EmptyCart />
            <CartItems />
            <SubTotal />
        </div>
    );
};

export const Checkout = memo(Component);
