import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks";
import styles from "./user-orders-link.module.css";

export function UserOrdersLink() {

    const currentUser = useAuthContext();

    return (
        <Link to={currentUser ? "/orders" : "/login"} className={styles.root}>
            <span className={styles["secondary-text"]}>Returns</span>
            <span className={styles["primary-text"]}>&#38; Orders</span>
        </Link>
    );
}