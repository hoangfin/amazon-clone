import { memo } from "react";
import { useStore } from "hooks";
import { cartStore } from "stores";
import { ReviewList } from "components/product";
import style from "./review-items.module.css";

const Component = () => {
    const [items] = useStore(cartStore);

    if (items.length === 0) return null;

    return (
        <div className={style.root}>
            <h2 className={style.heading}>Review items</h2>
            <ReviewList
                products={items}
                listItemClassName={style["list-item"]}
            />
        </div>
    );
};

export const ReviewItems = memo(Component, () => true);
