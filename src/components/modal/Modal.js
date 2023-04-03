import { memo } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export const Modal = memo(
    ({ isOpen, children }) => {
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
    }
);

Modal.displayName = "Modal";
