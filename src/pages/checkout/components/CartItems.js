import { memo, useCallback, useRef, useMemo } from "react";
import { useStore } from "hooks";
import { Button } from "components/button";
import { Card } from "components/card";
import { Select } from "components/select";
import { cartStore } from "stores";
import { remove, update } from "stores/cart";
import style from "./cart-items.module.css";

const options = Array.from({ length: 10 }, (_, i) => i + 1);

const EmptyCart = () =>
    <div className={style["empty-cart"]}>
        <h1 className={style["empty-cart-heading"]}>Your cart is empty</h1>
        <img className={style["empty-cart-image"]} src={`${process.env.PUBLIC_URL}/empty-cart.svg`} />
    </div>
;

const ListItem = memo(({ item }) => {
    const quantityRef = useRef();

    const updateQuantity = useCallback(() => {
        update(item.id, { quantity: parseInt(quantityRef.current.value) });
    }, [item.id]);

    const removeItem = useCallback(() => remove(item.id), [item.id]);

    const media = useMemo(() =>
        <img className={style["media-image"]} src={item.imageURL} />,
        [item]
    );

    const content = useMemo(() =>
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
        </>,
        [item]
    );

    return (
        <li className={style["list-item"]}>
            <Card
                media={media}
                content={content}
                contentClassName={style.content}
            />
        </li>
    );
});

const Component = () => {
    const [items] = useStore(cartStore);

    if (items.length === 0) return <EmptyCart />;

    return (
        <div className={style.root}>
            <h1 className={style.title}>Shopping Cart</h1>
            <ul>
                {items.map(item => <ListItem key={item.id} item={item} />)}
            </ul>
        </div>
    );

};

export const CartItems = memo(Component, () => true);