import { Pagination } from "components";
import { Modal } from "components/modal";
import { Spinner } from "components/progress";
import { useService } from "hooks";
import { memo, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByQuery as service } from "services/product";
import { Header } from "../commons";
import { SearchResults } from "./components";
import style from "./search.module.css";

const Component = () => {
    const [searchParams] = useSearchParams();
    const [products, getProductsByQuery, isFetching] = useService(service);

    const fetchProducts = useCallback(
        pageNumber => {
            const category = searchParams.get("category");
            const query = {
                q: searchParams.get("title") || "*",
                query_by: "title",
                ...(category !== "All" ? { filter_by: `categories: [${category}]` } : {}),
                page: pageNumber,
                per_page: 12
            };

            getProductsByQuery(query);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        [searchParams, getProductsByQuery]
    );

    useMemo(() => fetchProducts(1), [fetchProducts]);

    return (
        <>
            <Header className={style.header} />
            <SearchResults products={products} />
            <Pagination
                key={searchParams.toString()}
                pageCount={10}
                defaultPage={1}
                onPageChange={fetchProducts}
            />
            <Modal isOpen={isFetching}>
                <Spinner />
            </Modal>
        </>
    )
};

export const Search = memo(Component);