import { memo } from "react";
import styles from "./search-button.module.css";

export const SearchButton = memo((props) =>
    <button {...props} className={`${styles.root}${props.className ? " " + props.className : ""}`}>
        <svg className={styles.icon} viewBox="0 0 24 24">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#search`} />
        </svg>
    </button>
);

SearchButton.displayName = "SearchButton";