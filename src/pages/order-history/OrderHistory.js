import { useCallback } from "react";
import { Order } from "components";
import { Spinner } from "components/progress";
import { useService } from "hooks";
import { getOrdersByEmail as getOrdersByEmailService} from "services/order";
import styles from "./order-history.module.css";
import { Header } from "../commons";
import { useStore, userStore } from "stores";

export const OrderHistory = () => {
    const [user] = useStore(userStore);
    const [orders, getOrdersByEmail, isLoading] = useService(getOrdersByEmailService);

    return (
        <>
            <Header />

            <div className={styles.root}>
                <h1 className={styles.heading}>Your Orders</h1>
                {
                    !isLoading &&
                    orders?.length &&
                    <ul>
                        {orders.map(order =>
                            <li key={order.id}>
                                <Order {...order} />
                            </li>
                        )}
                    </ul>
                }
            </div>

            {isLoading && <div className={styles.loader}><Spinner /></div>}
        </>
    )
};
