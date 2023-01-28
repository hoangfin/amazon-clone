import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import { Card } from "components/card";
import { memo } from "react";
import style from "./search-results.module.css";

const ImageMemoized = memo(props => <img {...props} />);

const Content = memo(({ product }) =>
    <>
        <h3>{product.title}</h3>
        <Rating readOnly value={product.rating} precision={0.1} size="small" />
        <CurrencyFormat price={product.price} />
    </>
);

const Component = ({ products }) => {
    if (!products?.length) {
        return <div>Couldn't find anything here</div>;
    }

    return (
        <ul className={style.list}>
            {products?.map(product =>
                <li className={style["list-item"]} key={product.id}>
                    <Card
                        media={<ImageMemoized className={style["media-image"]} src={product.imageURLs[0]} />}
                        content={<Content product={product} />}
                        mediaClassName={style.media}
                    />
                </li>
            )}
        </ul>
    );
};

export const SearchResults = memo(Component);