import { useCart } from "features/cart";
import CheckoutProduct from "../../../CheckoutProduct";
import styles from "./shopping-cart.module.css";

function ShoppingCart() {

    const currentCart = useCart();

    return (
        <div className={styles.root}>
            <h1>Shopping Cart</h1>
            <ul className="checkout__product-list">
                {currentCart.map(item => (
                    <li key={item.id} className="checkout__product-list-item">
                        <CheckoutProduct
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingCart;