import { memo } from "react";
import { Link } from "react-router-dom";
import { cartStore } from "stores";
import { useStore } from "hooks";
import { getPriceSum, getQuantitySum } from "utils";
import style from "./subtotal.module.css";

const Component = () => {
    const [items] = useStore(cartStore);

    if (items.length === 0) return null;

    return (
        <p className={style.subtotal}>
            <span>
                Subtotal ({getQuantitySum(items)} items):
                &#160;<strong>&#36;{(getPriceSum(items) / 100).toFixed(2)}</strong>
            </span>
            <Link to="/payment" className={style.checkout}>
                Proceed to checkout
            </Link>
        </p>
    );
};

export const SubTotal = memo(Component, () => true);