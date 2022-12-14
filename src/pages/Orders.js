import moment from "moment";
import { CurrencyFormat } from "components";
import { UserOrdersList } from "features/auth";
import styles from "./orders.module.css";

export const Orders = ({ order }) => {

    return (
        <div className="order">
            <h2>Order <i>{order.id}</i></h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small></small>
            </p>
            <UserOrdersList />
            <hr />
            <h3 className="order__total">Order Total: <CurrencyFormat price={order.data.amount / 100} /></h3>

        </div>
    )
};
