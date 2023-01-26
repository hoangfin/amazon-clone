import { memo } from "react";
import style from "./currency-format.module.css";

const Component = ({ price, className }) => {
    if (!price) return null;

    const [whole, fraction] = (price / 100).toFixed(2).split(".");

    return (
        <p className={`${style.root}${className ? " " + className : ""}`}>
            <span className={style.symbol}>$</span>
            <span className={style.whole}>{whole}</span>
            <span className={style.fraction}>{fraction}</span>
        </p>
    )
};

export const CurrencyFormat = memo(Component);
