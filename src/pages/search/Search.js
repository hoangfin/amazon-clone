import { Pagination } from "components";
import { Modal } from "components/modal";
import { Spinner } from "components/progress";
import { useService } from "hooks";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByQuery as service } from "services/product";
import { Header } from "../commons";
import { SearchResults } from "./components";
import style from "./search.module.css";

const Component = () => {
    const [searchParams] = useSearchParams();
    const [products, getProductsByQuery, isFetching] = useService(service);
    const filteredProducts = useMemo(() => {
        if (!products) return null;

        if (products.length === 0) return [];

        return products.map(product => ({
            id: product.id,
            title: product.title,
            imageURL: product.imageURLs[0],
            price: product.price,
            rating: product.rating
        }));
    }, [products]);

    const handlePageChange = useCallback(
        pageNumber => {
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
        },
        [searchParams, getProductsByQuery]
    );

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
    }, [searchParams, getProductsByQuery]);

    return (
        <>
            <Header className={style.header} />
            <SearchResults isFetching={isFetching} products={filteredProducts} />
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