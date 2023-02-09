import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { add } from "stores/cart";
import { ProductCard } from "components/card";
import { Button } from "components/button";
import style from "./search-results.module.css";

const ListItem = memo(({ product }) => {
    const addProduct = useCallback(() => add(product, 1), []);

    return (
        <li className={style["list-item"]}>
            <Link to={`/products/${product.id}`}>
                <ProductCard
                    product={product}
                    mediaOverlayColor="silver"
                    mediaClassName={style.media}
                    mediaImageClassName={style["media-image"]}
                />
            </Link>
            <Button onClick={addProduct} className={style["add-button"]}>
                Add to Cart
            </Button>
        </li>
    );
});

const Component = ({ products, isFetching }) => {

    if (!products || isFetching) return null;

    if (products.length === 0) {
        return <div>Couldn't find anything here</div>;
    }

    return (
        <ul className={style.list}>
            {products.map(product => <ListItem key={product.id} product={product} />)}
        </ul>
    );
};

export const SearchResults = memo(Component);