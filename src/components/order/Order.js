import { memo } from "react";
import moment from "moment";
import { ReviewList } from "components/product";
import style from "./order.module.css";

const Component = ({ id, amount, items, created }) =>
    <div className={style.root}>
        <h2 className={style.header}>
            <p className={style.id}>ORDER # <strong>{id}</strong></p>
            <p>{moment.unix(created).format("MMMM Do YYYY")}</p>
        </h2>

        <ReviewList
            products={items}
            className={style.list}
            listItemClassName={style["list-item"]}
        />

        <p className={style.total}>
            Order Total: <strong>&#36;{amount / 100}</strong>
        </p>
    </div>
;

export const Order = memo(Component);