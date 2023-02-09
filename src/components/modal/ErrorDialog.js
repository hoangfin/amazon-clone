import { memo } from "react";
import { Modal } from "./Modal";
import style from "./error-dialog.module.css";

const Component = ({ title, message, isOpen, onClose, className }) =>
    <Modal isOpen={isOpen}>
        <div className={`${style.root}${className ? " " + className : ""}`}>
            <h3 className={style.header}>
                <svg className={style["error-icon"]} viewBox="0 0 24 24">
                    <use xlinkHref="/sprites.svg#error" />
                </svg>
                {title}
                <button className={style.close} onClick={onClose}>
                    <svg className={style["close-icon"]} viewBox="0 0 24 24">
                        <use xlinkHref="/sprites.svg#close" />
                    </svg>
                </button>
            </h3>
            <p className={style.message}>{message}</p>
        </div>
    </Modal>
    ;

export const ErrorDialog = memo(Component);