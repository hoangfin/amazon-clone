import { useStore } from "hooks";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "stores";
import { Header } from "../commons";
import { PaymentMethod, ReviewItems, ShippingAddress } from "./components";
import style from "./payment.module.css";

const Component = () => {
    const [user] = useStore(userStore);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, [user]);

    return (
        <>
            <Header />
            <h1 className={style.title}>Payment</h1>
            <div className={style.container}>
                <ShippingAddress />
                <ReviewItems />
                <PaymentMethod />
            </div>

        </>
    );
};

export const Payment = memo(Component, () => true);