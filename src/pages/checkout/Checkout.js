import { memo } from "react";
import { Header } from "../commons";
import { CartItems, SubTotal } from "./components";
import style from "./checkout.module.css";

const Component = () => {

    return (
        <>
            <Header className={style.header} />
            <div className={style.container}>
                <CartItems />
                <SubTotal />
            </div>
        </>
    );
};

export const Checkout = memo(Component);
