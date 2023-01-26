import { memo } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../commons";
import { ProductInfo } from "./ProductInfo";
import style from "./product.module.css";

const Component = () => {
    const { id } = useParams();

    return (
        <>
            <Header className={style.header} />
            <ProductInfo productID={id} className={style["product-info"]} />
        </>
    );
};

export const Product = memo(Component);