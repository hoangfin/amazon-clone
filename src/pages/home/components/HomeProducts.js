import { Carousel } from "components/carousel";
import { useService } from "hooks";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProductsByQuery as service } from "services/product";
import style from "./home-products.module.css";

const createSlideComponent = (product) =>
    <Link to={`/products/${product.id}`}>
        <img className={style["slide-image"]} src={product.imageURLs[0]} />
    </Link>
;

export const HomeProducts = memo(() => {
    const [result, getProductsByQuery, isFetching] = useService(service);

    useMemo(() => {
        getProductsByQuery({
            q: "*",
            filter_by: "categories:=[`Home & Kitchen`]&&rating:<=4",
            per_page: 20
        });
    }, []);

    if (!result?.products) return null;

    return (
        <>
            <Carousel
                slides={result?.products}
                slideComponent={createSlideComponent}
                slidesPerView={6}
                option={{ loop: true, align: "start", slidesToScroll: 6 }}
                className={style.carousel}
            />
        </>
    );
}, () => true);