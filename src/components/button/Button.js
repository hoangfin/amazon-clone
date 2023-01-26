import { memo } from "react";
import styles from "./button.module.css";

const Component = (props) =>
    <button
        {...props}
        className={
            `${styles.root}${props.className ? " " + props.className : ""}`
        }
        disabled={props.isProcessing || props.disabled}
    >
        {props.children}
    </button>
;

export const Button = memo(Component);