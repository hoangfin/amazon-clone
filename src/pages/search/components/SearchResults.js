import { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { cartStore } from "stores";
import { Card } from "components/card";
import { Button } from "components/button";
import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import style from "./search-results.module.css";

const ListItem = memo(({ product }) => {
    const media = useMemo(() =>
        <Link to={`/products/${product.id}`}>
            <img className={style["media-image"]} src={product.imageURLs[0]} />
        </Link>,
        [product]
    );

    const content = useMemo(() =>
        <>
            <Link to={`/products/${product.id}`} className={style.title}>
                {product.title}
            </Link>
            <Rating readOnly value={product.rating} precision={0.1} size="small" />
            <Link to={`/products/${product.id}`}>
                <CurrencyFormat price={product.price} />
            </Link>
        </>,
        [product]
    );

    const addProduct = useCallback(() => {
        const item = {
            id: product.id,
            title: product.title,
            imageURL: product.imageURLs[0],
            price: product.price
        };
        cartStore.add(item, 1)
    }, []);

    return (
        <li className={style["list-item"]}>
            <Card
                media={media}
                mediaOverlayColor="silver"
                content={content}
                mediaClassName={style.media}
                contentClassName={style.content}
            />
            <Button onClick={addProduct} className={style["add-button"]}>
                Add to Cart
            </Button>
        </li>
    );
});

export const SearchResults = memo(({ products }) => {
    if (!products) return null;

    if (products.length === 0) {
        return <div>Couldn't find anything here</div>;
    }

    return (
        <ul className={style.list}>
            {products.map(product =>
                <ListItem key={product.id} product={product} />
            )}
        </ul>
    );
});