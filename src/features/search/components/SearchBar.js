import { useCallback, useRef } from "react";
import { Select } from "components";
import { getProducts } from "services";
import { useFetch } from "hooks";
import styles from "./search-bar.module.css";
import { SearchButton } from "./SearchButton";

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

export const SearchBar = ({ onSearch }) => {
    const categoryRef = useRef(null);
    const titleRef = useRef(null);
    const [products, isFetching, fetch] = useFetch(getProducts);

    const handleClick = e => {
        e.preventDefault();

        if (typeof onSearch === "function") {
            onSearch({
                category: categoryRef.current.value,
                title: titleRef.current.value
            });
        }

    };

    const search = useCallback(e => {

        if (!titleRef.current.value) {
            return;
        }

        const query = {
            q: titleRef.current.value,
            query_by: "title",
            page: 1,
            per_page: 12
        };

        if (categoryRef.current.value !== "All") {
            query.filter_by = `categories:[${categoryRef.current.value}]`
        }

        fetch(query);
    }, []);

    return (
        <div className={styles.root}>

            <Select
                ref={categoryRef}
                options={categories}
                defaultValue={categories[0]}
                onChange={search}
                selectClassName={styles.select}
            />

            <input
                type="text"
                ref={titleRef}
                className={styles.input}
                defaultValue=""
                onKeyUp={search}
            />

            <SearchButton className={styles["search-button"]} onClick={handleClick} />

            {
                products &&
                <ul className={styles.list}>
                    {products.map(product =>
                        <li key={product.id} className={styles["list-item"]}>
                            <div className={styles["image-container"]}>
                                <img className={styles.image} src={product.imageURLs[0]} />
                            </div>
                            <div className={styles.title}>
                                <span dangerouslySetInnerHTML={{__html: product.highlights[0].snippet}}></span>
                            </div>
                        </li>
                    )}
                </ul>
            }
        </div>
    )
};
