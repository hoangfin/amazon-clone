import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./product-card.module.css";

const Component = ({ product, className }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div
            className={`${styles.root}${className ? " " + className : ""}`}
            onClick={handleClick}
        >
            <div className={styles["image-container"]}>
                <img
                    className={styles.image}
                    src={product.imageURLs[0]}
                    alt={`Image of product ${product.id}`}
                />
            </div>

            <div className={styles.info}>

                <p className={styles.title}>{product.title}</p>

                <Rating
                    readOnly
                    value={product.rating}
                    precision={0.1}
                    size="small"
                />

                <CurrencyFormat
                    price={product.price}
                    rootClassName={styles.currency}
                />

            </div>
        </div>
    );
};

export const ProductCard = memo(Component);