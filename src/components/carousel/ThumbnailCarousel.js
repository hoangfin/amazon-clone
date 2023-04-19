import { memo, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import style from "./thumbnail-carousel.module.css";

const Component = ({
    slides,
    thumbnailsPerView,
    className
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mainViewportRef, emblaAPI] = useEmblaCarousel({
        containScroll: "keepSnaps",
        align: "start"
    });
    const [thumbnailsViewportRef, emblaThumbsAPI] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
        align: "start"
    });

    const handleThumbnailClick = useCallback(index => {
        if (!(emblaAPI && emblaThumbsAPI)) return;
        if (!emblaThumbsAPI.clickAllowed()) return;
        emblaAPI.scrollTo(index);
    }, [emblaAPI, emblaThumbsAPI]);

    useEffect(() => {
        if (emblaAPI) {
            const handleSelect = () => {
                setSelectedIndex(emblaAPI.selectedScrollSnap());
            };
            emblaAPI.on("select", handleSelect);

            return () => { emblaAPI.off("select", handleSelect) }
        }
    }, [emblaAPI]);

    useEffect(() => {
        if (emblaThumbsAPI) {
            emblaThumbsAPI.scrollTo(selectedIndex);
        }
    }, [selectedIndex, emblaThumbsAPI]);

    if (!slides?.length) return null;

    return (
        <div className={`${style.root}${className ? " " + className : ""}`}>
            <div ref={mainViewportRef} className={style.viewport}>
                <div className={style["slides-container"]}>
                    {slides.map((slide, index) =>
                        <div key={index} className={style.slide}>
                            <img src={slide} className={style["slide-image"]} />
                        </div>
                    )}
                </div>
            </div>

            <div ref={thumbnailsViewportRef} className={style.viewport}>
                <div
                    className={
                        style["slides-container"] +
                        (thumbnailsPerView ? " --slides-per-view-" + thumbnailsPerView : "")
                    }
                >
                    {slides.map((slide, index) =>
                        <div
                            key={index}
                            className={style["thumbnail-slide"] +(index === selectedIndex ? " --selected" : "")}
                        >
                            <button className={style.thumbnail} onClick={() => handleThumbnailClick(index)}>
                                <img src={slide} className={style["slide-image"]} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ThumbnailCarousel = memo(Component);
