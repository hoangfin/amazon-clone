import { Rating } from "@mui/material";
import { CurrencyFormat } from "components";
import { ThumbnailCarousel } from "components/carousel";
import { Select } from "components/select";
import { memo, useMemo } from "react";
import { Card } from "./Card";
import style from "./product-card.module.css";

const options = Array.from({ length: 10 }, idx => idx + 1);

const Component = ({
    product,
    mediaOverlayColor,
    className,
    mediaClassName,
    mediaImageClassName,
    mediaCarouselClassName,
    contentClassName,
    titleClassName
}) => {
    const memoizedMedia = useMemo(() => {
        if (product?.imageURL) {
            return <img className={mediaImageClassName} src={product.imageURL} />
        }

        if (product?.imageURLs) {
            return (
                <ThumbnailCarousel
                    key={product.id}
                    className={style.carousel}
                    slides={product.imageURLs}
                    thumbnailsPerView={4}
                />
            );
        }

        return null;
    }, [product]);

    const memoizedContent = useMemo(() => {
        if (!product) return null;

        return (
            <>
                <h1
                    className={
                        style.title +
                        (titleClassName ? " " + titleClassName : "")
                    }
                >
                    {product.title}
                </h1>

                {
                    product.rating
                        ?   <Rating
                                value={product.rating}
                                precision={0.1}
                                size="small"
                            />
                        :   null
                }

                <CurrencyFormat price={product.price} />

                {
                    product.quantity
                        ?   <Select
                                // ref={quantityRef}
                                options={options}
                                defaultValue={product.quantity}
                                label="Qty:"
                            />
                        :   null
                }

                {
                    product.specification?.length
                        ?   <ul className={style.specs}>
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
                        :   null
                }

                {
                    product.about?.length
                        ?   <>
                                <h3 className={style.about}>About this item</h3>
                                {/* <ul className={style.features}>
                                    {product.about.map(feature =>
                                        <li key={feature}>{feature}</li>
                                    )}
                                </ul> */}
                            </>
                        :   null
                }
            </>
        );
    }, [product]);

    if (!product) return null;

    return (
        <Card
            media={memoizedMedia}
            content={memoizedContent}
            mediaOverlayColor={mediaOverlayColor}
            className={className}
            mediaClassName={mediaClassName}
            contentClassName={style.content + (contentClassName ? " " + contentClassName : "")}
        />
    );
};

export const ProductCard = memo(Component);