import { ProductCard } from "components/card";
import { Modal } from "components/modal";
import { Spinner } from "components/progress";
import { useService } from "hooks";
import { memo, useCallback, useEffect, useState } from "react";
import { getProductByID as getProductByIDService } from "services/product";
import style from "./product-info.module.css";

const Component = ({ productID, className }) => {
    const [product, getProductByID, isFetching] = useService(getProductByIDService);
    const [error, setError] = useState(null);
    console.log(product);

    const handleClose = useCallback(() => setError(null), []);

    useEffect(() => {
        if (productID) {
            console.log("useeffect called");
            getProductByID(productID)
                .catch(err => {
                    setError(err.message);
                });
        }
    }, [productID]);

    return (
        <>
            <ProductCard className={style.card} product={product} />

            <Modal isOpen={isFetching}>
                <Spinner />
            </Modal>

            <Modal isOpen={error} onClose={handleClose}>
                {error}
            </Modal>
        </>
    )
};

export const ProductInfo = memo(Component);
