
/* import ShoppingCart from "../../ShoppingCart";
import { useShoppingCart } from "../../store";
import Subtotal from "../../Subtotal.js"; */
import styles from "./checkout.module.css";

import Header from "./commons/Header";

function Checkout() {

    // const shoppingCart = useShoppingCart();

    return (
        <div className={styles.root}>
            <Header />
        </div>
    );
}

{/* <div className={styles.root}>
            <Header />
            {shoppingCart.length === 0
                ? <div className={styles["empty-cart"]}>
                    <img src="/empty-cart.svg" />
                    <h2>Your Amazon Cart is empty</h2>
                </div>

                : <div className="checkout__container">
                    <div className="checkout__left">
                        <div className="checkout__shopping-details">
                                <h1 className="checkout__title">Shopping Cart</h1>
                                <ul className="checkout__product-list">
                                    {shoppingCart.map(item => (
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
                        <ShoppingCart />
                    </div>

                    <div className="checkout__right">
                        <Subtotal />
                    </div>
                </div>

            }
        </div> */}

export default Checkout;