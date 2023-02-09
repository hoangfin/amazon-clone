import { Link } from "react-router-dom";
import { AuthNav, CartNav, OrderNav } from "./components";
import { SearchBar } from "./components";
import { memo } from "react";
import style from "./header.module.css";

const Component = (props) => {

    return (
        <header
            {...props}
            className={
                `${style.root}${props.className ? " " + props.className : ""}`
            }
        >
            <Link className={style.logo} to="/">
                <svg viewBox="0 0 602.280 181.499">
                    <use xlinkHref="/sprites.svg#amazon-logo" />
                </svg>
            </Link>

            <SearchBar />

            <div className={style.navs}>
                <AuthNav />
                <OrderNav />
                <CartNav />
            </div>
        </header>
    )
};

export const Header = memo(Component);