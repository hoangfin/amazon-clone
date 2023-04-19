import { memo } from "react";
import { Link } from "react-router-dom";
import { AuthNav, CartNav, OrderNav, SearchBar } from "./components";
import style from "./header.module.css";

export const Header = memo(({ className }) =>
    <header className={`${style.root}${className ? " " + className : ""}`}>
        <Link className={style.logo} to="/">
            <svg viewBox="0 0 602.280 181.499">
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#amazon-logo`} />
            </svg>
        </Link>

        <SearchBar />

        <div className={style.navs}>
            <AuthNav />
            <OrderNav />
            <CartNav />
        </div>
    </header>
);

Header.displayName = "Header";