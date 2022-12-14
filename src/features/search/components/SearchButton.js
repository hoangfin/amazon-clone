import styles from "./search-button.module.css";

export const SearchButton = ({ className, onClick }) =>
    <button
        type="button"
        className={`${styles.root}${className ? " " + className : ""}`}
        onClick={onClick}
    >
        <svg className={styles.icon} viewBox="0 0 24 24">
            <use xlinkHref="/sprites.svg#search" />
        </svg>
    </button>;
