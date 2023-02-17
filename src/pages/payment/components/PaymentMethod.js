import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "hooks";
import { cartStore, userStore } from "stores";
import { StripeCardPayment } from "components";
import { getPriceSum, getQuantitySum } from "utils";
import { Dialog } from "components/modal";
import style from "./payment-method.module.css";

const Component = () => {
    const [user] = useStore(userStore);
    const [cart] = useStore(cartStore);
    const [isPaymentSucceeded, setIsPaymentSucceeded] = useState(false);
    const navigate = useNavigate();

    const closeSuccessDialog = useCallback(() => {
        setIsPaymentSucceeded(false);
        navigate("/", { replace: true });
    }, []);

    const showSuccessDialog = useCallback(() => setIsPaymentSucceeded(true), []);

    return (
        <>
            <div className={style.root}>
                <p className={style.heading}>Payment method</p>
                <div>
                    <p className={style.total}>
                        <strong>&#36;{getPriceSum(cart) / 100}</strong>
                        &#160;({getQuantitySum(cart)} items)
                    </p>
                    <StripeCardPayment items={cart} orderedBy={user?.email} onSucceed={showSuccessDialog} />
                </div>
            </div>
            
            <Dialog type="success" title="Payment Success" isOpen={isPaymentSucceeded} onClose={closeSuccessDialog}>
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