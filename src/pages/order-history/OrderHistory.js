import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "hooks";
import { userStore } from "stores";
import { Header } from "../commons";
import { Orders } from "./components";
import style from "./order-history.module.css";

export const OrderHistory = () => {
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

            <div className={style.container}>
                <h1 className={style.heading}>Your Orders</h1>
                <Orders />
            </div>

        </>
    );
};
