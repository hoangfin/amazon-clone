import { memo } from "react";
import { Card } from "components/card";
import style from "./review-list.module.css";

const MediaMemoized = memo(({ product }) =>
    <img
        className={style.image}
        src={product.imageURL}
        alt={`Product ${product.id} image`}
    />
);

const ContentMemoized = memo(({ product }) =>
    <>
        <p className={style.title}>{product.title}</p>
        <p className={style.price}>&#36;{(product.price / 100).toFixed(2)}</p>
        <p>Quantity: {product.quantity}</p>
    </>
);

const Component = ({ products, className }) => {
    return (
        <ul className={style.root + (className ? " " + className : "")}>
            {products.map(product =>
                <li key={product.id}>
                    <Card
                        media={<MediaMemoized product={product} />}
                        content={<ContentMemoized product={product} />}
                    />
                </li>
            )}
        </ul>
    );
};

export const ReviewList = memo(Component);