import { memo } from "react";
import styles from "./review-list-item.module.css";

const Component = ({ id, imageURL, title, price, quantity, className }) =>
    <div className={`${styles.root}${className ? " " + className : ""}`}>
        <div className={styles["image-container"]}>
            <img
                className={styles.image}
                src={imageURL}
                alt={`Product ${id} image`}
            />
        </div>
        <div className={styles.info}>
            <p className={styles.title}>{title}</p>
            <p className={styles.price}>&#36;{(price / 100).toFixed(2)}</p>
            <p>Quantity: {quantity}</p>
        </div>
    </div>;

export const ReviewListItem = memo(Component);