import { memo, useCallback, useEffect, useState } from "react";
import { ProductDetail } from "components";
import { Modal } from "components/modal";
import { Spinner } from "components/progress";
import { useService } from "hooks";
import { getProductByID as getProductByIDService } from "services/product";

const Component = ({ productID, className }) => {
    const [product, getProductByID, isFetching] = useService(getProductByIDService);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = useCallback(() => { setIsModalOpen(false); }, []);

    useEffect(() => {
        if (productID) {
            console.log("useeffect called");
            getProductByID(productID)
                .catch(err => {
                    setError(err.message);
                    setIsModalOpen(true);
                });
        }
    }, [productID]);

    return (
        <>
            <ProductDetail
                product={product}
                className={className}
            />

            <Modal isOpen={isFetching}>
                <Spinner />
            </Modal>

            <Modal isOpen={isModalOpen} onClose={handleClose}>
                {error}
            </Modal>
        </>
    )
};

export const ProductInfo = memo(Component);
