import { memo } from "react";
import moment from "moment";
import { ReviewListItem } from "components/product/ReviewListItem";
import styles from "./order.module.css";

/**
 *
 * @param {Object} order
 * @param {String} order.id
 * @param {Number} order.amount
 * @param {Array} order.items
 * @param {Date} order.created
 *
 */
const Component = ({ id, amount, items, created }) => {
    <div className={styles.root}>
        <h2 className={styles.header}>
            <p className={styles.id}>ORDER # <strong>{id}</strong></p>
            <p>{moment.unix(created).format("MMMM Do YYYY")}</p>
        </h2>

        <ul>
            {items.map(item =>
                <li key={item.id} className={styles.li}>
                    <ReviewListItem {...item} className={styles.list} />
                </li>
            )}
        </ul>

        <p className={styles.total}>
            Order Total: <strong>&#36;{amount / 100}</strong>
        </p>
    </div>
};

export const Order = memo(Component);