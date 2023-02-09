import { memo } from "react";
import { Modal } from "./Modal";
import style from "./dialog.module.css";

const Component = ({ title, children, isOpen, onClose, className, contentClassName }) =>
    <Modal isOpen={isOpen}>
        <div className={`${style.root}${className ? " " + className : ""}`}>
            <h3 className={style.header}>
                {title}
                <button className={style.close} onClick={onClose}>
                    <svg className={style["close-icon"]} viewBox="0 0 24 24">
                        <use xlinkHref="/sprites.svg#close" />
                    </svg>
                </button>
            </h3>
            <div className={contentClassName}>
                {children}
            </div>
        </div>
    </Modal>
;

export const Dialog = memo(Component);