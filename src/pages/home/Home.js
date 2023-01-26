import { Carousel, CarouselSlide, ImageLink } from "components";
import { useService } from "hooks";
import { useResizeObserver } from "hooks/useResizeObserver";
import { useEffect } from "react";
import { getProductsByQuery } from "services/product";
import { Header } from "../commons";
import { Categories, Banner } from "./components";
import style from "./home.module.css";

export const Home = () => {
    const [homeKitProducts, apiCall, isLoading] = useService(getProductsByQuery);
    const [width, height] = useResizeObserver();
    console.log(homeKitProducts);

    useEffect(() => {
        apiCall({
            q: "*",
            filter_by: "categories:=[`Home & Kitchen`]&&rating:<=4",
            per_page: 20
        });
    }, []);

    return (
        <div className={style.root}>
            <Header className={style.header} />

            <div className={style.container}>
                <Banner className={style.banner} />
                <Categories className={style.categories} />


                {/* <section className={style.section}>
                    <h3 className={style["section-title"]}>Best Sellers in Home &#38; Kitchen</h3>
                    {
                        homeKitProducts &&
                        <Carousel
                            slidesPerView={6}
                            className={style["home-kitchen-carousel"]}
                            options={{ loop: true, align: "start", slidesToScroll: 6 }}
                        >
                            {homeKitProducts.map(product =>
                                <CarouselSlide
                                    key={product.id}
                                    className={style["home-kitchen-carousel-slide"]}
                                >
                                    <ImageLink
                                        link={`/products/${product.id}`}
                                        imageURL={product.imageURLs[0]}
                                        alt={product.title}

                                    />
                                </CarouselSlide>
                            )}
                        </Carousel>
                    }
                </section> */}
            </div>
        </div>
    )
};
