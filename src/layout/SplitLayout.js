import styles from "./split-layout.module.css";

export const SplitLayout = ({
    className,
    children,
    breakpoint
}) => {
    const [left, right] = children;

    return (
        <div className={`${styles.root}${className ? " " + className : ""}`}>
            <div>{left}</div>
            <div>{right}</div>
        </div>
    )
};
