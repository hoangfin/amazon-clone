import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "hooks";
import { userStore, cartStore } from "stores";
import { StripeCardPayment } from "components";
import { createOrder } from "services/order";
import { getPriceSum, getQuantitySum } from "utils";
import { Dialog } from "components/modal";
import style from "./payment-method.module.css";

const Component = () => {
    const [user] = useStore(userStore);
    const [cart] = useStore(cartStore);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        setDialogOpen(false);
        navigate("/", { replace: true });
    }, []);

    const handleSucceed = useCallback(
        ({ paymentID, amount, created }) => {
            if (user?.email && cart.length !== 0) {
                const order = { id: paymentID, orderedBy: user.email, items: cart, amount, created }
                createOrder(paymentID, order)
                    .then(() => {
                        setDialogOpen(true);
                        cartStore.set([]);
                    })
                    .catch(err => { });
            }
        },
        [user?.email, cart, navigate]
    );

    return (
        <>
            <div className={style.root}>
                <p className={style.heading}>Payment method</p>
                <div>
                    <p className={style.total}>
                        <strong>&#36;{getPriceSum(cart) / 100}</strong>
                        &#160;({getQuantitySum(cart)} items)
                    </p>
                    <StripeCardPayment items={cart} onSucceed={handleSucceed} />
                </div>
            </div>
            <Dialog title="Payment Success" isOpen={true} onClose={handleClose}>
                <p className={style["primary-text"]}>
                    Thank you for shopping with us
                </p>
                <p className={style["secondary-text"]}>
                    You'll be redirected to home page after closing this dialog
                </p>
            </Dialog>
        </>
    )
};

export const PaymentMethod = memo(Component);