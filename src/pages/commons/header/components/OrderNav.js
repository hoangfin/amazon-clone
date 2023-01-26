import { memo } from "react";
import { Link } from "react-router-dom";
import { useStore, userStore } from "stores";
import style from "./order-nav.module.css";

const Component = () => {
    const [user] = useStore(userStore);

    return (
        <Link
            to={user ? "/order-history" : "/login"}
            className={style.root}
        >
            <span className={style["secondary-text"]}>Returns</span>
            <span className={style["primary-text"]}>&#38; Orders</span>
        </Link>
    );
};

export const OrderNav = memo(Component);