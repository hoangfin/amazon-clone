import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import { useNavigate } from "react-router-dom";
import styles from "./product-card.module.css";

export const ProductCard = ({
    product,
    className
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem(product.id, JSON.stringify(product));
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
