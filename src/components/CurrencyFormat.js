import styles from "./currency-format.module.css";

export const CurrencyFormat = ({
    price,
    className
}) => {
    const [whole, fraction] = (price / 100).toFixed(2).split(".");

    return (
        <p className={`${styles.root}${className ? " " + className : ""}`}>
            <span className={styles.symbol}>$</span>
            <span className={styles.whole}>{whole}</span>
            <span className={styles.fraction}>{fraction}</span>
        </p>
    )
}
