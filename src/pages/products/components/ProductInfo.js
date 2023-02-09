import { memo, useMemo, useCallback, useEffect, useState } from "react";
import { Card } from "components/card";
import { ThumbnailCarousel } from "components/carousel";
import { Modal } from "components/modal";
import { Spinner } from "components/progress";
import { useService } from "hooks";
import { getProductByID as getProductByIDService } from "services/product";
import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import style from "./product-info.module.css";

const Component = ({ productID, className }) => {
    const [product, getProductByID, isFetching] = useService(getProductByIDService);
    const [error, setError] = useState(null);

    const content = useMemo(() => {
        if (!product) return null;

        return (
            <>
                <h1 className={style.title}>{product.title}</h1>
                <Rating value={product.rating} precision={0.1} size="small" />
                <CurrencyFormat price={product.price} />
                <ul className={style.specification}>
                    {product.specification.map(spec => {
                        const t = spec.split(":");
                        return (
                            <li key={spec} className={style["specs-item"]}>
                                <b>{t[0]}</b>
                                <span>{t[1]}</span>
                            </li>
                        );
                    }
                    )}
                </ul>

                <p className={style.about}>About this item</p>
                <ul className={style.features}>
                    {product.about.map(feature =>
                        <li key={feature}>{feature}</li>
                    )}
                </ul>
            </>
        );
    }, [product]);

    const handleClose = useCallback(() => setError(null), []);

    useEffect(() => {
        if (productID) {
            getProductByID(productID)
                .catch(err => setError(err.message));
        }
    }, [productID]);

    return (
        <div className={style.root}>
            <Card
                media={
                    <ThumbnailCarousel
                        key={product?.id}
                        slides={product?.imageURLs}
                        thumbnailsPerView={4}
                        className={style.carousel}
                    />
                }
                content={content}
                className={style.card}
                contentClassName={style.content}
            />

            <Modal isOpen={isFetching}>
                <Spinner />
            </Modal>

            <Modal isOpen={error} onClose={handleClose}>
                {error}
            </Modal>
        </div>
    )
};

export const ProductInfo = memo(Component);
