import { memo } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

const Component = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <>
            <div className={styles.backdrop} />
            <div className={styles.content}>
                {children}
            </div>
        </>
        ,
        document.getElementById("modal")
    );
};

export const Modal = memo(Component);
