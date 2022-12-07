import { useCallback, useRef } from "react";
import { Select } from "components";
import { getProducts } from "services";
import { useFetch } from "hooks";
import styles from "./search-bar.module.css";
import { SearchButton } from "./SearchButton";
import { ProductImage } from "components/ProductImage";

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

export function SearchBar({ onSearch }) {

    const categoryRef = useRef("All");
    const titleRef = useRef(null);
    const [products, isFetching, fetch] = useFetch(getProducts);

    console.log(products);

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

        console.log(`category = ${categoryRef.current.value}`);
        console.log(`title = ${titleRef.current.value}`);

        if (!titleRef.current.value) {
            return;
        }

        const query = {
            q: titleRef.current.value,
            query_by: "title",
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

            { products &&
                <ul className={styles.list}>
                    {products.map(product =>
                        <li key={product.id} className={styles["list-item"]}>
                            <div className={styles["image-container"]}>
                                <ProductImage src={product.imageURLs[0]} />
                            </div>
                            <div dangerouslySetInnerHTML={{__html: product.highlights[0].snippet}}></div>
                        </li>
                    )}
                </ul>}
        </div>
    )
}
