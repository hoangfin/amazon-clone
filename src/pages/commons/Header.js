import { Link, useNavigate } from "react-router-dom";
import { UserOrdersLink, UserStatus } from "features/auth";
import { CartIcon } from "features/cart";
import { SearchBar } from "features/search";
import styles from "./header.module.css";
import { useEffect, useState } from "react";

function Header(props) {

    const navigate = useNavigate();

    const handleSearch = ({ category, title }) => {
        if (category === "All" && title === "") {
            navigate("/");
            return;
        }

        const params = new URLSearchParams();
        params.set("category", category);
        title && params.set("title", title);
        navigate(`/search?${params.toString()}`);
    };

    return (
        <header
            {...props}
            className={
                `${styles.root}${props.className ? " " + props.className : ""}`
            }
        >
            <div className={styles["logo-bar"]}>

                <Link to="/">
                    <svg className={styles.logo} viewBox="0 0 602.280 181.499">
                        <use xlinkHref="/sprites.svg#amazon-logo" />
                    </svg>
                </Link>

                <SearchBar onSearch={handleSearch} />
                <UserStatus />
                <UserOrdersLink />
                <CartIcon />
            </div>

            {/* visible on small screen */}
            {/* <ul className="header__category">
            <li className="header__category-item"><a>Amazon Basics</a></li>
            <li className="header__category-item"><a>Deals</a></li>
            <li className="header__category-item"><a>Best Sellers</a></li>
            <li className="header__category-item"><a>Prime</a></li>
            <li className="header__category-item"><a>Livestreams</a></li>
            <li className="header__category-item"><a>Video</a></li>
            <li className="header__category-item"><a>New Releases</a></li>
            <li className="header__category-item"><a>Home</a></li>
            <li className="header__category-item"><a>Books</a></li>
            <li className="header__category-item"><a>Luxury Stores</a></li>
            <li className="header__category-item"><a>Pharmacy</a></li>
            <li className="header__category-item"><a>Health &#38; Household</a></li>
            <li className="header__category-item"><a>PC</a></li>
            <li className="header__category-item"><a>Amazon Explore</a></li>
            <li className="header__category-item"><a>Music</a></li>
        </ul> */}

            {/* visible on large screen */}
            {/* <ul className="header__category">
            <li className="header__category-item"><a>All</a></li>
            <li className="header__category-item"><a>Today"s Deals</a></li>
            <li className="header__category-item"><a>Customer Service</a></li>
            <li className="header__category-item"><a>Registry</a></li>
            <li className="header__category-item"><a>Gift Cards</a></li>
            <li className="header__category-item"><a>Sell</a></li>
        </ul>

        <div className="header__location">
            <span className="header__location-icon"></span>
            <span className="header__location-text">Deliver to location</span>
        </div> */}
        </header>
    )
}

export default Header;