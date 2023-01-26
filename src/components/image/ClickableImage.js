import { memo } from "react";
import styles from "./clickable-image.module.css";

const Component = ({ className, onClick, imgSrc, alt }) =>
    <button
        className={`${styles.root}${className ? " " + className : ""}`}
        onClick={onClick}
    >
        <img src={imgSrc} alt={alt} />
    </button>
;

export const ClickableImage = memo(Component);
