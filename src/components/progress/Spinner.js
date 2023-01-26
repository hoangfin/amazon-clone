import { memo } from "react";
import spinnerIcon from "./images/spinner.svg";
import style from "./spinner.module.css";

const Component = ({ className }) =>
    <img
        className={`${style.image}${className ? " " + className : ""}`}
        src={spinnerIcon}
        alt="spinner icon"
    />
;
export const Spinner = memo(Component);
