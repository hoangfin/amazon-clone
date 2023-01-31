import { memo, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ClickableImage } from "components";
import styles from "./thumbnail-carousel.module.css";

const Component = ({
    slides,
    thumbnailsPerView,
    options,
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
        if (emblaAPI && emblaThumbsAPI) {
            emblaThumbsAPI.clickAllowed() && emblaAPI.scrollTo(index);
        }
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

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <section>
                <div ref={mainViewportRef} className={styles.viewport}>
                    <div className={styles.slides}>
                        {slides.map((slide, index) =>
                            <div key={index} className={styles.slide}>
                                <img src={slide} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <div ref={thumbnailsViewportRef} className={styles.viewport}>
                    <div className={`${styles.slides}${thumbnailsPerView ? " --thumbnails-per-view-" + thumbnailsPerView : ""
                        }`}>
                        {slides.map((slide, index) =>
                            <div key={index} className={styles.slide}>
                                <ClickableImage
                                    className={`${styles.thumbnail}${
                                        index === selectedIndex ? " --selected" : ""
                                    }`}
                                    imgSrc={slide}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export const ThumbnailCarousel = memo(Component);
