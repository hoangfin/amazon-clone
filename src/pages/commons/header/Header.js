import { Link } from "react-router-dom";
import { AuthNav, CartNav, OrderNav } from "./components";
import { SearchBar } from "components/search";
import styles from "./header.module.css";
import { memo } from "react";

const Component = (props) => {

    return (
        <header
            {...props}
            className={
                `${styles.root}${props.className ? " " + props.className : ""}`
            }
        >
            <Link className={styles.logo} to="/">
                <svg viewBox="0 0 602.280 181.499">
                    <use xlinkHref="/sprites.svg#amazon-logo" />
                </svg>
            </Link>

            <SearchBar />

            <div className={styles["actions-group"]}>
                <AuthNav />
                <OrderNav />
                <CartNav />
            </div>
        </header>
    )
};

export const Header = memo(Component);