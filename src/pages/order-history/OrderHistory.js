import { Header } from "../commons";
import { Orders } from "./components";
import style from "./order-history.module.css";

export const OrderHistory = () => {

    return (
        <>
            <Header />

            <div className={style.root}>
                <h1 className={style.heading}>Your Orders</h1>
                <Orders />
            </div>

        </>
    );
};
