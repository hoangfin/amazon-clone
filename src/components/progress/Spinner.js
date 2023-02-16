import { memo } from "react";
import style from "./spinner.module.css";

const Component = ({ className }) =>
    <img
        className={`${style.image}${className ? " " + className : ""}`}
        src={`${process.env.PUBLIC_URL}//spinner.svg`}
        alt="spinner icon"
    />
;
export const Spinner = memo(Component);
