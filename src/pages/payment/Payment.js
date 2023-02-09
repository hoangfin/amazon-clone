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
            navigate("/login");
        }
    }, [user]);

    return (
        <>
            <Header />
            <div className={style.root}>
                <section className={style.section}>
                    <h3 className={style.heading}>Shipping Address</h3>
                    <div className={style.content}>
                        <ShippingAddress />
                    </div>
                </section>

                <p className={style.heading}>Review items</p>
                <ReviewItems />
                
                <section className={style.section}>
                    <h3 className={style.heading}>Payment method</h3>
                    <div className={style.content}>
                        <PaymentMethod />
                    </div>
                </section>
            </div>

        </>
    );
};

export const Payment = memo(Component, () => true);