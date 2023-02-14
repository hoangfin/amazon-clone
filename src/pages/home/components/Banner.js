import { memo } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "components/carousel";
import style from "./banner.module.css";

const slides = [
    {
        link: "/search?category=Toys+%26+Games",
        imageURL: "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"
    },
    {
        link: "/search?category=Beauty+%26+Personal+Care",
        imageURL: "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg"
    },
    {
        link: "/search?category=Computers",
        imageURL: "https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg"
    },
    {
        link: "/search?category=Home+%26+Kitchen",
        imageURL: "https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg"
    },
];

const slideComponent = slide =>
    <Link to={slide.link}>
        <img className={style["slide-image"]} src={slide.imageURL} />
    </Link>
;

const Component = ({ className }) =>
    <Carousel
        slides={slides}
        slideComponent={slideComponent}
        option={{ loop: true, align: "start" }}
        className={className}
        prevButtonClassName={style.prev}
        nextButtonClassName={style.next}
    />
;

export const Banner = memo(Component);
