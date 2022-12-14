import { ProductDetail } from "components/product";
import { useParams } from "react-router-dom";
import { addProductToCart } from "features/cart";
import styles from "./products.module.css";
import Header from "./commons/Header";

export const Products = () => {
    const { id } = useParams();
    const product = JSON.parse(localStorage.getItem(id));

    return (
        <>
            <Header />

            <ProductDetail
                className={styles["product-detail"]}
                product={product}
                onAddToCart={addProductToCart}
            />

        </>
    );
};