import { memo } from "react";
import { Header } from "../commons";
import { CartItems, SubTotal } from "./components";
import style from "./checkout.module.css";

export const Checkout = memo(() =>
    <>
        <Header className={style.header} />
        <div className={style.container}>
            <CartItems />
            <SubTotal />
        </div>
    </>
);

Checkout.displayName = "Checkout";
