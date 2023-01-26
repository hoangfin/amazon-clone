import { Link } from "react-router-dom";
import { useUserStore } from "../useUserStore";
import styles from "./user-orders-link.module.css";

export function UserOrdersLink() {
    const [authUser] = useUserStore();

    return (
        <Link
            to={authUser ? "/order-history" : "/login"}
            className={styles.root}
        >
            <span className={styles["secondary-text"]}>Returns</span>
            <span className={styles["primary-text"]}>&#38; Orders</span>
        </Link>
    );
};

