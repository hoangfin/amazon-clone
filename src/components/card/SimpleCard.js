import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./simple-card.module.css";

const Component = ({ title, imageSrc, link, linkLabel, className }) =>
    <div className={`${styles.root}${className ? " " + className : ""}`}>
        <h3>{title}</h3>
        <img src={imageSrc} />
        <Link to={link}>{linkLabel}</Link>
    </div>
;

export const SimpleCard = memo(Component);