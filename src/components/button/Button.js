import styles from "./button.module.css";

export const Button = (props) =>
    <button
        {...props}
        className={
            `${styles.root}${props.className ? " " + props.className : ""}`
        }
    />;
