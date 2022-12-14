import { useNavigate } from "react-router-dom";
import { useAuthContext } from "features/auth";
import { ShoppingCart } from "features/cart";
import Header from "./commons/Header";
import styles from "./checkout.module.css";

export const Checkout = () => {
    const authUser = useAuthContext();
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <Header />

            <ShoppingCart
                className={styles["shopping-cart"]}
                onCheckout={() => navigate(authUser ? "/payment" : "/login")}
            />
        </div>
    );
};
