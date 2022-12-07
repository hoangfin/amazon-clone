import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks";

export function UserOrdersList() {

    const currentUser = useAuthUser();
    const orders = [];
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser]);

    return (
        <ul>
            {orders.map(order =>
                <li key={order.id}></li>
            )}
        </ul>
    );
}

{/* <div className="order">
            <h2>Order <i>{order.id}</i></h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small></small>
            </p>
            {order.data.basket?.map(item => (
                <OrderedProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    quantity={item.quantity}
                />
            ))}
            <hr />
            <h3 className="order__total">Order Total: <CurrencyFormat price={order.data.amount / 100} /></h3>

        </div> */}
