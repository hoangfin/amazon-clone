import styles from "./prev-button.module.css";

export const PrevButton = ({ className, iconClassName, onClick, disabled }) =>
    <button
        className={`${styles.root}${className ? " " + className : ""}`}
        onClick={onClick}
        disabled={disabled}
    >
        <svg className={iconClassName} viewBox="0 0 24 24">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#arrow-back`} />
        </svg>
    </button>
;
