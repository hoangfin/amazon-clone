import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components";
import { useStore, userStore, cartStore } from "stores";
import { getPriceSum, getQuantitySum } from "utils";
import style from "./subtotal.module.css";

const Component = () => {
    const [user] = useStore(userStore);
    const [cart] = useStore(cartStore);
    const navigate = useNavigate();

    if (cart.length === 0) return null

    return (
        <p className={style.subtotal}>
            <span>
                Subtotal ({getQuantitySum(cart)} items):
                &#160;<strong>&#36;{(getPriceSum(cart) / 100).toFixed(2)}</strong>
            </span>
            <Button
                className={style.checkout}
                onClick={() => navigate(user ? "/payment" : "/login")}
            >
                Proceed to checkout
            </Button>
        </p>
    )
};

export const SubTotal = memo(Component);