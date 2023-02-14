import { memo } from "react";
import { Spinner } from "components/progress";
import style from "./loading-button.module.css";

export const LoadingButton = memo(({ isLoading, ...props }) =>
    <button
        {...props}
        className={style.root + (props.className ? " " + props.className : "")}
    >
        {props.children}
        {isLoading ? <Spinner className={style.spinner} /> : null}
    </button>
);