import { Rating } from "@mui/material";
import { CurrencyFormat, Select } from "components";
import { useRef } from "react";
import styles from "./product-detail.module.css";

const options = Array.from({ length: 9 }, (_, index) => index + 1)

export const ProductDetail = ({ className, product, onAddToCart }) => {
    const quantityRef = useRef(null);
    console.log(product);
    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <div className={styles["image-container"]}>
                {product.imageURLs.map(imageURL =>
                    <img key={imageURL} src={imageURL} />
                )}
            </div>
            <div className={styles.detail}>
                <h1 className={styles.title}>{product.title}</h1>

                <Rating
                    value={product.rating}
                    precision={0.1}
                    size="small"
                />

                <CurrencyFormat
                    price={product.price}
                />

                <Select
                    ref={quantityRef}
                    options={options}
                    defaultValue={options[0]}
                />

                <button
                    className={styles["add-to-cart-button"]}
                    onClick={e => {
                        const newProduct = { ...product, quantity: parseInt(quantityRef.current.value) };
                        console.log(newProduct);
                        onAddToCart(newProduct);
                    }}
                >
                    Add to Cart
                </button>

                <h3 className={styles["product-details"]}>Product details</h3>

                <ul>
                    {product.specification.map(spec =>
                        <li>{spec}</li>
                    )}
                </ul>

                <h3 className={styles["about-this-item"]}>About this item</h3>

                <ul>
                    {product.about.map(a =>
                        <li>{a}</li>
                    )}
                </ul>
            </div>
        </div>
    );
};