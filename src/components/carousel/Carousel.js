import { memo, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton } from "components/button";
import style from "./carousel.module.css";

const Component = ({
    slides,
    slideComponent,
    slidesPerView,
    option,
    className,
    prevButtonClassName,
    nextButtonClassName
}) => {
    const [viewportRef, emblaAPI] = useEmblaCarousel(option);
    const scrollPrev = useCallback(() => emblaAPI?.scrollPrev(), [emblaAPI]);
    const scrollNext = useCallback(() => emblaAPI?.scrollNext(), [emblaAPI]);

    return (
        <div className={`${style.root}${className ? " " + className : ""}`}>
            <div ref={viewportRef} className={style.viewport}>
                <div
                    className={
                        style["slides-container"] +
                        (slidesPerView ? " --slides-per-view-" + slidesPerView : "")
                    }>
                    {slides.map((slide, index) =>
                        <div key={index} className={style.slide}>
                            {slideComponent(slide, index)}
                        </div>
                    )}
                </div>
            </div>
            <PrevButton
                className={
                    style["prev-button"] +
                    (prevButtonClassName ? " " + prevButtonClassName : "")
                }
                onClick={scrollPrev}
            />
            <NextButton
                className={
                    style["next-button"] +
                    (nextButtonClassName ? " " + nextButtonClassName : "")
                }
                onClick={scrollNext}
            />
        </div>
    );
};

export const Carousel = memo(Component);