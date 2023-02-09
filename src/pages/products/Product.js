import { memo } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../commons";
import { ProductInfo } from "./components/ProductInfo";
import style from "./product.module.css";

const Component = () => {
    const { id } = useParams();

    return (
        <>
            <Header className={style.header} />
            <ProductInfo productID={id} />
        </>
    );
};

export const Product = memo(Component);