import { memo } from "react";
import { Card } from "components/card";
import style from "./review-list.module.css";

const MediaMemoized = memo(({ product }) =>
    <img
        src={product.imageURL}
        alt={`Product ${product.id} image`}
        className={style["media-image"]}
    />
);

const ContentMemoized = memo(({ product }) =>
    <>
        <p className={style.title}>{product.title}</p>
        <p className={style.price}>&#36;{(product.price / 100).toFixed(2)}</p>
        <p>Quantity: {product.quantity}</p>
    </>
);

const Component = ({ products, className, listItemClassName }) => {
    return (
        <ul className={style.root + (className ? " " + className : "")}>
            {products.map(product =>
                <li
                    key={product.id}
                    className={
                        style["list-item"] +
                        (listItemClassName ? " " + listItemClassName : "")
                    }
                >
                    <Card
                        media={<MediaMemoized product={product} />}
                        content={<ContentMemoized product={product} />}
                        contentClassName={style.content}
                    />
                </li>
            )}
        </ul>
    );
};

export const ReviewList = memo(Component);