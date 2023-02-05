import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "hooks";
import { userStore, cartStore } from "stores";
import { StripeCardPayment } from "components";
import { createOrder } from "services/order";
import { getPriceSum, getQuantitySum } from "utils";
import styles from "./payment-method.module.css";

const Component = ({ onError }) => {
    const [user] = useStore(userStore);
    const [cart] = useStore(cartStore);
    const navigate = useNavigate();

    const handleSucceed = useCallback(
        ({ paymentID, amount, created }) => {
            createOrder(paymentID, {
                id: paymentID,
                orderedBy: user.email,
                items: cart,
                amount,
                created
            })
                .then(() => {
                    cartStore.set([]);
                    navigate("/");
                })
                .catch(err => onError(err));
        },
        [createOrder, user?.email, cart, cartStore.set, navigate]
    );

    return (
        <>
            <p className={styles.total}>
                <strong>&#36;{getPriceSum(cart) / 100}</strong>
                &#160;({getQuantitySum(cart)} items)
            </p>
            <StripeCardPayment
                items={cart}
                className={styles.card}
                onSucceed={handleSucceed}
            />
        </>
    )
};

export const PaymentMethod = memo(Component);