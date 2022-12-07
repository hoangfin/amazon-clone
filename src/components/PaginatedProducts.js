import { useCallback } from "react";
import ReactPaginate from "react-paginate";
import Product from "./Product";
import styles from "./paginated-products.module.css";

function PaginatedProducts(props) {

    const handlePageChange = useCallback(() => {

    }, []);

    if (!props.products || props.products.length === 0) {
        return;
    }

    return (
        <div
            {...props}
            className={
                `${styles.root}${props.className ? " " + props.className : ""}`
            }
        >
            <ul className={styles.list}>
                {props.products.map(product =>
                    <li className={styles["list-item"]} key={product.id}>
                        <Product
                            id={product.id}
                            image={product.imageURLs[0]}
                            title={product.title}
                            rating={product.rating}
                            price={product.price}
                            rootClassName={styles["product-root"]}
                            imgClassName={styles["product-image"]}
                        />
                    </li>
                )}
            </ul>
            <ReactPaginate
                breakLabel="..."
                previousLabel="<"
                nextLabel=">"
                onPageChange={handlePageChange}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                // pageCount={pageCount}
                containerClassName={styles.container}
                pageClassName={styles.page}
                pageLinkClassName={styles.link}
                activeLinkClassName={styles.activeLink}
                nextClassName={styles.link}
                previousClassName={styles.link}
                breakClassName={styles.link}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default PaginatedProducts