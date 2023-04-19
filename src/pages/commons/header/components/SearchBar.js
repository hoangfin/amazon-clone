import { useCallback, useEffect, useRef, useState, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Select } from "components/select";
import { useService, useDebounceCallback } from "hooks";
import { SearchButton } from "components/button";
import { getProductsByQuery as service } from "services/product";
import style from "./search-bar.module.css";
import { List, ListItem } from "components/list";

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
    const root = useRef(null);
    const categoryRef = useRef(null);
    const titleRef = useRef(null);
    const [searchParams] = useSearchParams();
    const [result, getProductsByQuery] = useService(service);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navigate = useNavigate();
    console.log(result?.products);

    const getListItem = useCallback(
        item =>
            <ListItem key={item.id} className={style["list-item"]}>
                <button
                    onClick={() => {
                        setShowSearchResults(false);
                        navigate(`/products/${item.id}`);
                    }}
                    className={style.title}
                    dangerouslySetInnerHTML={{ __html: item.highlights[0].snippet }}
                />
            </ListItem>,
        []
    );

    const search = useCallback(
        async () => {
            if (!titleRef.current.value) {
                setShowSearchResults(false);
                return;
            }

            const query = {
                q: titleRef.current.value,
                query_by: "title",
                page: 1,
                sort_by: "_text_match:desc",
                num_typos: 0,
                per_page: 12,
                exhaustive_search: true
            };

            if (categoryRef.current.value !== "All") {
                query.filter_by = `categories:[${categoryRef.current.value}]`
            }

            console.log(query);

            await getProductsByQuery(query);
            setShowSearchResults(true);
        },
        []
    );

    const debounceSearch = useDebounceCallback(search, 320);

    const handleSearchClick = () => {
        setShowSearchResults(false);
        if (categoryRef.current.value === "All" && !titleRef.current.value) {
            navigate("/");
            return;
        }

        const params = new URLSearchParams();
        params.set("category", categoryRef.current.value);
        titleRef.current.value && params.set("title", titleRef.current.value);
        navigate(`/search?${params.toString()}`);
    };

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
        <div ref={root} className={`${style.root}${className ? " " + className : ""}`}>
            <Select
                ref={categoryRef}
                options={categories}
                defaultValue={searchParams.get("category") || categories[0]}
                onChange={search}
                selectClassName={style.select}
            />

            <input
                ref={titleRef}
                type="text"
                defaultValue={searchParams.get("title") || ""}
                onKeyUp={debounceSearch}
                className={style.input}
            />

            <SearchButton onClick={handleSearchClick} className={style["search-button"]} />

            {showSearchResults ? <List items={result?.products} itemComponent={getListItem} className={style.list} /> : null}
        </div>
    )
};

export const SearchBar = memo(Component);

SearchBar.displayName = "SearchBar";
