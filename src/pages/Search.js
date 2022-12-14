
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination, GridList } from "components";
import { ProductCard } from "components/product";
import { useFetch } from "hooks";
import { getProducts } from "services";
import Header from "./commons/Header";
import styles from "./search.module.css";

export const Search = () => {
    const [searchParams] = useSearchParams();
    const [products, isFetching, fetch] = useFetch(getProducts);

    console.log(products);

    const handlePageChange = pageNumber => {

        console.log("handlePageChange: " + pageNumber);
        const query = {
            q: searchParams.get("title") || "*",
            query_by: "title",
            page: pageNumber,
            per_page: 12
        };

        if (searchParams.get("category") !== "All") {
            query.filter_by = `categories: [${searchParams.get("category")}]`
        }

        fetch(query);

    };

    useEffect(() =>{
        return () => { console.log("useEffect([]) about to unmount"); }
    }, []);

    useEffect(() => {
        console.log("useEffect[searchParams]");
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

    return (
        <div className={styles.root}>
            <Header className={styles.header} />

            {
                products?.length &&
                <ul className={styles.list}>
                    {products.map(product =>
                        <li className={styles["list-item"]} key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    )}
                </ul>
            }

            <Pagination
                pageCount={10}
                defaultPage={1}
                onPageChange={handlePageChange}
            />
        </div>
    )
};
