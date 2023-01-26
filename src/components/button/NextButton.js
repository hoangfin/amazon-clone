import styles from "./next-button.module.css";

export const NextButton = ({ className, iconClassName, onClick, disabled }) =>
    <button
        className={`${styles.root}${className ? " " + className : ""}`}
        onClick={onClick}
        disabled={disabled}
    >
        <svg className={iconClassName} viewBox="0 0 24 24">
            <use xlinkHref="/sprites.svg#arrow-forward" />
        </svg>
    </button>
;