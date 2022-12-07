
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PaginatedProducts from "components/PaginatedProducts";

import styles from "./search.module.css";
import Header from "./commons/Header";
import { useFetch } from "hooks";
import { getProducts } from "services";

function Search() {
    const [searchParams] = useSearchParams();
    const [products, isFetching, fetch] = useFetch(getProducts);

    console.log(products);

    useEffect(() => {
        const query = {
            q: searchParams.get("title") || "*",
            query_by: "title",
            per_page: 12
        };

        if (searchParams.get("category") !== "All") {
            query.filter_by = `categories: [${searchParams.get("category")}]`
        }

        fetch(query);
    }, [searchParams]);

    if (isFetching) {
        return <CircularProgress />
    }

    return (
        <div className={styles.root}>
            <Header className={styles.header} />

            <PaginatedProducts className={styles["paginated-products"]} products={products} />
        </div>
    )
}

export default Search;