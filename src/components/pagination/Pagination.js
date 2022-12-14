import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.css";

export const Pagination = ({ pageCount, defaultPage, onPageChange }) => {

    const handlePageChange = ({ selected }) => {
        // ReactPaginate component has page number misalignment.
        // The page number index starts with 0 instead of 1
        // therefore, re-alignment is needed by adding 1 to selected page
        onPageChange(selected + 1);
    };

    return (
        <ReactPaginate
            pageCount={pageCount}
            initialPage={defaultPage - 1}
            onPageChange={handlePageChange}
            disableInitialCallback={true}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            containerClassName={styles.container}
            pageClassName={styles.page}
            pageLinkClassName={styles.link}
            activeLinkClassName={styles.activeLink}
            nextClassName={styles.link}
            previousClassName={styles.link}
            breakClassName={styles.link}
            renderOnZeroPageCount={null}
        />
    )
}
