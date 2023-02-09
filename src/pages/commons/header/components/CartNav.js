import { memo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "hooks";
import { cartStore } from "stores";
import { getQuantitySum } from "utils";
import style from "./cart-nav.module.css";

const Component = () => {
    const [cart] = useStore(cartStore);

    return (
        <Link to="/checkout" className={style.root}>
            <svg viewBox="0 0 20 20">
                <use xlinkHref="/sprites.svg#cart" />
            </svg>
            <span>{getQuantitySum(cart)}</span>
        </Link>
    );
};

export const CartNav = memo(Component, () => true);