import { memo, useCallback, useRef, useMemo } from "react";
import { useStore } from "hooks";
import { Button } from "components/button";
import { Card } from "components/card";
import { Select } from "components/select";
import { cartStore } from "stores";
import { remove, update } from "stores/cart";
import style from "./cart-items.module.css";

const options = Array.from({ length: 10 }, (_, i) => i + 1);

const MediaMemoized = memo(({ src }) =>
    <img className={style["media-image"]} src={src} />
);

const ContentMemoized = memo(({ item }) => {
    const quantityRef = useRef();

    const updateQuantity = useCallback(() => {
        update(item.id, { quantity: parseInt(quantityRef.current.value) });
    }, [item?.id]);

    const removeItem = useCallback(() => {
        remove(item.id);
    }, [item?.id]);

    if (!item) return null;

    return (
        <>
            <p className={style["item-title"]}>{item.title}</p>
            <p className={style.price}>&#36;{(item.price / 100).toFixed(2)}</p>
            <Select
                key={`${item.id + item.quantity}`}
                ref={quantityRef}
                defaultValue={item.quantity}
                options={options}
                label="Qty:"
                onChange={updateQuantity}
            />
            <Button type="button" onClick={removeItem}>
                Delete
            </Button>
        </>
    );
});

const Component = () => {
    const [items] = useStore(cartStore);

    if (items.length === 0) return null;

    return (
        <div className={style.root}>
            <h1 className={style.title}>Shopping Cart</h1>
            <ul>
                {items.map(item =>
                    <li className={style["list-item"]}>
                        <Card
                            media={<MediaMemoized src={item.imageURL} />}
                            content={<ContentMemoized item={item} />}
                            contentClassName={style.content}
                        />
                    </li>
                )}
            </ul>
        </div>
    );

};

export const CartItems = memo(Component, () => true);