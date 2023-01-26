import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { List, Pagination } from "components";
import { Spinner } from "components/progress";
import { Modal } from "components/modal";
import { ProductCard } from "components/product";
import { useService } from "hooks";
import styles from "./search-page.module.css";
import { getProductsByQuery as service } from "services/product";
import { Header } from "../commons";
import { Hits } from "./components";

const Component = () => {
    const [searchParams] = useSearchParams();
    const [products, getProductsByQuery, isFetching] = useService(service);

    const handlePageChange = pageNumber => {
        const query = {
            q: searchParams.get("title") || "*",
            query_by: "title",
            page: pageNumber,
            per_page: 12
        };

        if (searchParams.get("category") !== "All") {
            query.filter_by = `categories: [${searchParams.get("category")}]`
        }

        getProductsByQuery(query);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const query = {
            q: searchParams.get("title") || "*",
            query_by: "title",
            page: 1,
            per_page: 12
        };

        if (searchParams.get("category") !== "All") {
            query.filter_by = `categories: [${searchParams.get("category")}]`
        }

        getProductsByQuery(query);
    }, [searchParams]);

    return (
        <>
            <Header className={styles.header} />
            <Hits products={products} />
            <Pagination
                key={searchParams.toString()}
                pageCount={10}
                defaultPage={1}
                onPageChange={handlePageChange}
            />

            <Modal isOpen={isFetching}>
                <Spinner />
            </Modal>
        </>
    )
};

export const Search = memo(Component);