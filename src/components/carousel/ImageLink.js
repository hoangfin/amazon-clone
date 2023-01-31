import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./image-link.module.css";

const Component = ({ link, imageURL, alt, className, imgClassName }) =>
    <Link
        className={`${styles.root}${className ? " " + className : ""}`}
        to={link}
    >
        <img className={imgClassName} src={imageURL} alt={alt} />
    </Link>
;

export const ImageLink = memo(Component);