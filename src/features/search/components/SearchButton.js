import styles from "./search-button.module.css";

export function SearchButton(props) {

    return (
        <button
            {...props}
            type="button"
            className={
                `${styles.root}${props.className ? " " + props.className : ""}`
            }
        >
            <svg className={styles.icon} viewBox="0 0 24 24">
                <use xlinkHref="/sprites.svg#search" />
            </svg>
        </button>
    )
}
