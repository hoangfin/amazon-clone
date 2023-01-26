import { ProductCard } from "components";
import { memo } from "react";
import style from "./hits.module.css";

const Component = ({ products }) => {

    if (!products?.length) {
        return <div>Couldn't find anything here</div>;
    }

    return (
        <ul className={style.list}>
            {products?.map(product =>
                <li className={style["list-item"]} key={product.id}>
                    <ProductCard className={style["product-card"]} product={product} />
                </li>
            )}
        </ul>
    )
};

export const Hits = memo(Component);