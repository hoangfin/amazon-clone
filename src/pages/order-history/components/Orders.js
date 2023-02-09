import { memo, useMemo, useState } from "react";
import { useService, useStore } from "hooks";
import { getOrdersByEmail as service } from "services/order";
import { Order } from "components/order";
import { ErrorDialog, Modal } from "components/modal";
import { Spinner } from "components/progress";
import { userStore } from "stores";

export const Orders = memo(() => {
    const [user] = useStore(userStore);
    const [orders, getOrdersByEmail, isFetching] = useService(service);
    const [error, setError] = useState(null);

    useMemo(() => {
        if (user) {
            getOrdersByEmail(user.email).catch(setError);
        }
    }, [user]);

    if (!orders) return null;

    if (orders.length === 0) {
        return <p>Looks like you haven't placed an order</p>;
    }

    return (
        <>
            <ul>
                {orders.map(order =>
                    <li key={order.id}>
                        <Order {...order} />
                    </li>
                )}
            </ul>

            <Modal isOpen={isFetching}>
                <Spinner />
            </Modal>

            <ErrorDialog
                isOpen={error}

            />
        </>
    );
});