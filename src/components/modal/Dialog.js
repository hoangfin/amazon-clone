import { memo } from "react";
import { Modal } from "./Modal";
import style from "./dialog.module.css";

const Component = ({
    type,
    title,
    message,
    children,
    onClose,
    className,
    titleClassName,
    contentClassName,
    ...modalProps
}) => {
    const successIcon = type === "success"
    ?   <svg className={style["success-icon"]} viewBox="0 0 24 24">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#success`} />
        </svg>
    :   null;

    const errorIcon = type === "error"
        ?   <svg className={style["error-icon"]} viewBox="0 0 24 24">
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#error`} />
            </svg>
        :   null;

    return (
        <Modal {...modalProps}>
            <div className={`${style.root}${className ? " " + className : ""}`}>
                <header className={style.header}>
                    {successIcon}
                    {errorIcon}
                    <h2
                        className={
                            style.title +
                            (type === "error" ? " --error" : "") +
                            (titleClassName ? " " + titleClassName : "")
                        }
                    >
                            {title}
                        </h2>
                    <button className={style.close} onClick={onClose}>
                        <svg className={style.icon} viewBox="0 0 24 24">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#close`} />
                        </svg>
                    </button>
                </header>
                <div className={style.content + (contentClassName ? " " + contentClassName : "")}>
                    {message ? <p className={style.message}>{message}</p> : null}
                    {children}
                </div>
            </div>
        </Modal>
    );

};

export const Dialog = memo(Component);