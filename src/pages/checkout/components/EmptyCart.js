import { memo } from "react";
import { useStore } from "hooks";
import { cartStore } from "stores";
import style from "./empty-cart.module.css";

const Component = ({ className }) => {
    const [items] = useStore(cartStore);

    if (items.length) return null;

    return (
        <div className={style.root + (className ? " " + className : "")}>
            <h1 className={style.heading}>Your cart is empty</h1>
            <img className={style.image} src="/empty-cart.svg" />
        </div>
    );
};

export const EmptyCart = memo(Component);