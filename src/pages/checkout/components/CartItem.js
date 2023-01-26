import { useRef } from "react";
import { Button, Select } from "components";
import styles from "./cart-item.module.css";

const options = Array.from({ length: 10 }, (_, i) => i + 1);

export const CartItem = ({ item, className }) => {
    const quantityRef = useRef(null);

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <div className={styles["image-container"]}>
                <img
                    className={styles.image}
                    src={item.imageURL}
                    alt={`Product ${item.id} image`}
                />
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>

                <p className={styles.price}>&#36;{(item.price / 100).toFixed(2)}</p>

                <Select
                    key={`${item.id + item.quantity}`}
                    ref={quantityRef}
                    defaultValue={item.quantity}
                    options={options}
                    label="Qty:"
                    onChange={() => {}
                        /* updateItemQuantity(
                        item.id,
                        parseInt(quantityRef.current.value)
                    ) */
                }
                />

                <Button
                    type="button"
                    onClick={() => {}}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
