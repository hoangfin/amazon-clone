import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import { Card } from "components/card";
import { memo } from "react";
import { Link } from "react-router-dom";
import style from "./search-results.module.css";

const Component = ({ products }) => {
    if (!products?.length) {
        return <div>Couldn't find anything here</div>;
    }

    return (
        <ul className={style.list}>
            {products?.map(product =>
                <li className={style["list-item"]} key={product.id}>
                    <Card
                        media={
                            <Link to={`/products/${product.id}`}>
                                <img className={style["media-image"]} src={product.imageURLs[0]} />
                            </Link>
                        }
                        content={
                            <Link className={style["content-link"]} to={`/products/${product.id}`}>
                                <h3 className={style.title}>{product.title}</h3>
                                <Rating readOnly value={product.rating} precision={0.1} size="small" />
                                <CurrencyFormat price={product.price} />
                            </Link>
                        }
                        mediaOverlayColor="silver"
                        mediaClassName={style.media}
                        contentClassName={style.content}
                    />
                </li>
            )}
        </ul>
    );
};

export const SearchResults = memo(Component);