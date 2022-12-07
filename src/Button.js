import { useEffect } from "react";
import styles from "./button.module.css";

function Button(props) {

    useEffect(() => {
        console.log("Button mounted");
        return () => { alert("Button unmounted")};
    }, []);
    return (
        <button
            {...props}
            className={
                `${styles.root}${props.className ? (" " + props.className) : ""}`
            }>
            {props.children}
        </button>
    )
}

export default Button;