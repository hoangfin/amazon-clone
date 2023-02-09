import { memo } from "react";
import { Spinner } from "components/progress";
import style from "./button.module.css";

const Component = ({ disabledType, ...props }) =>
    <button
        {...props}
        className={style.root + (props.className ? " " + props.className : "")}
    >
        <span>{props.children}</span>
        {
            (props.disabled && disabledType === "progress")
                ? <Spinner className={style.spinner} />
                : null
        }
    </button>
    ;

export const Button = memo(Component);