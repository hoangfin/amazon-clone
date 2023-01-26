import { useRef, memo, useCallback } from "react";
import { Rating } from "@mui/material";
import { CurrencyFormat, Select, Button, List, ThumbnailCarousel } from "components";
import styles from "./product-detail.module.css";
import { useStore, cartStore } from "stores";

const options = Array.from({ length: 9 }, (_, index) => index + 1);

const Component = ({ className, product }) => {
    const [cart] = useStore(cartStore);
    const quantityRef = useRef(null);

    const add = useCallback(() => {
        const data = { ...product, imageURL: product.imageURLs[0], quantity: parseInt(quantityRef.current.value) };

    }, []);

    if (!product) return null;

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <ThumbnailCarousel
                key={product.id}
                className={styles["thumbnail-carousel"]}
                slides={product.imageURLs}
                thumbnailsPerView={4}
            />

            <div className={styles.detail}>
                <h1 className={styles.title}>{product.title}</h1>

                <Rating value={product.rating} precision={0.1} size="small" />

                <CurrencyFormat price={product.price} />

                <Select
                    ref={quantityRef}
                    options={options}
                    defaultValue={options[0]}
                    label="Qty:"
                />

                <Button
                    className={styles["add-button"]}
                    onClick={add}
                >
                    Add to Cart
                </Button>

                <ul className={styles.specs}>
                    {product.specification.map(spec => {
                        const t = spec.split(":");
                        return (
                            <li key={spec} className={styles["specs-item"]}>
                                <b>{t[0]}</b>
                                <span>{t[1]}</span>
                            </li>
                        );
                    }
                    )}
                </ul>

                <h3 className={styles.about}>About this item</h3>

                <List className={styles.features} items={product.about} />
            </div>
        </div>
    );
};

export const ProductDetail = memo(Component);