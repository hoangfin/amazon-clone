import React from "react";
import styles from "./currency-format.module.css";

function CurrencyFormat({ price }) {

    const [whole, fraction] = (price / 100).toFixed(2).split(".");

    return (
        <p className={styles.root}>
            <span className={styles.symbol}>$</span>
            <span className={styles.whole}>{whole}</span>
            <span className={styles.fraction}>{fraction}</span>
        </p>
    )
}

export default CurrencyFormat;