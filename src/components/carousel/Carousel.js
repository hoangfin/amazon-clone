import { NextButton, PrevButton } from "components";
import useEmblaCarousel from "embla-carousel-react";
import { memo, useCallback } from "react";
import styles from "./carousel.module.css";

const Component = ({
    slidesPerView,
    children,
    options,
    className,
    prevButtonClassName,
    nextButtonClassName
}) => {
    const [viewportRef, emblaAPI] = useEmblaCarousel(options);
    const scrollPrev = useCallback(() => emblaAPI?.scrollPrev(), [emblaAPI]);
    const scrollNext = useCallback(() => emblaAPI?.scrollNext(), [emblaAPI]);

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <div ref={viewportRef} className={styles.viewport}>
                <div
                    className={`${styles["slide-container"]}${
                        slidesPerView ? " --slides-per-view-" + slidesPerView : ""
                    }`}
                >
                    {children.filter(child => child.type?.name === "CarouselSlide")}
                </div>
            </div>
            <PrevButton
                className={`${styles["prev-button"]}${
                    prevButtonClassName ? " " + prevButtonClassName : ""
                }`}
                onClick={scrollPrev}
            />
            <NextButton
                className={`${styles["next-button"]}${
                    nextButtonClassName ? " " + nextButtonClassName : ""
                }`}
                onClick={scrollNext}
            />
        </div>
    );
};

export const Carousel = memo(Component);
export const CarouselSlide = ({ className, children }) =>
    <div className={className}>{children}</div>
;
