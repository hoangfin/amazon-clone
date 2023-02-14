import { useCallback, useEffect, useRef, useState, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Select } from "components/select";
import { useService, useDebounceCallback } from "hooks";
import { SearchButton } from "components/button";
import { getProductsByQuery as getProductsByQueryService } from "services/product";
import styles from "./search-bar.module.css";

// declare list of categories here to avoid unnecessary recreation in case
// ProductSearch gets rerendered
const categories = [
    "All", "Arts & Crafts", "Automotive", "Baby", "Beauty & Personal Care",
    "Books", "Boys' Fashion", "Computers", "Deals", "Digital Music",
    "Electronics", "Girls' Fashion", "Health & Household", "Home & Kitchen",
    "Industrial & Scientific", "Kindle Store", "Luggage", "Men's Fashion",
    "Movies & TV", "Music CDs & Vinyl", "Pet Supplies", "Prime Video",
    "Software", "Sports & Outdoors", "Tools & Home Improvement",
    "Toys & Games", "Women's Fashion"
];

const Component = ({ className }) => {
    const [searchParams] = useSearchParams();
    const [products, getProductsByQuery] = useService(getProductsByQueryService);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navigate = useNavigate();
    const root = useRef(null);
    const categoryRef = useRef(null);
    const titleRef = useRef(null);

    const search = useCallback(
        async () => {
            if (!titleRef.current.value) return;

            const query = {
                q: titleRef.current.value,
                query_by: "title",
                page: 1,
                per_page: 12
            };

            if (categoryRef.current.value !== "All") {
                query.filter_by = `categories:[${categoryRef.current.value}]`
            }

            await getProductsByQuery(query);
            setShowSearchResults(true);
        },
        []
    );

    const handleSearchClick = () => {
        setShowSearchResults(false);
        if (categoryRef.current.value === "All" && titleRef.current.value === "") {
            navigate("/");
            return;
        }

        const params = new URLSearchParams();
        params.set("category", categoryRef.current.value);
        titleRef.current.value && params.set("title", titleRef.current.value);
        navigate(`/search?${params.toString()}`);
    };

    const debounceSearch = useDebounceCallback(search, 320);

    useEffect(() => {
        const handleClick = e => {
            if (!root.current.contains(e.target)) {
                setShowSearchResults(false);
            }
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        }
    }, []);

    return (
        <div
            ref={root}
            className={`${styles.root}${className ? " " + className : ""}`}
        >
            <Select
                ref={categoryRef}
                options={categories}
                defaultValue={searchParams.get("category") || categories[0]}
                onChange={search}
                selectClassName={styles.select}
            />

            <input
                type="text"
                ref={titleRef}
                className={styles.input}
                defaultValue={searchParams.get("title") || ""}
                onKeyUp={debounceSearch}
            />

            <SearchButton
                className={styles["search-button"]}
                onClick={handleSearchClick}
            />

            {
                showSearchResults &&
                products &&
                <ul className={styles.list}>
                    {products.map(product =>
                        <li key={product.id} className={styles["list-item"]}>
                            <span
                                onClick={() => {
                                    setShowSearchResults(false);
                                    navigate(`/products/${product.id}`);
                                }}
                                className={styles.title}
                                dangerouslySetInnerHTML={
                                    { __html: product.highlights[0].snippet }
                                }
                            />
                        </li>
                    )}
                </ul>
            }
        </div>
    )
};

export const SearchBar = memo(Component);
