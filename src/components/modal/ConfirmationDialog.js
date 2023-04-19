import { Modal } from "components/modal";
import { memo } from "react";
import style from "./confirmation-dialog.module.css";

export const ConfirmationDialog = memo(({ title, message, isOpen, onConfirm, onCancel }) =>
    <Modal isOpen={isOpen}>
        <div className={style.root}>
            <h2 className={style.header}>{title}</h2>
            <p className={style.message}>{message}</p>
            <div className={style.footer}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Yes</button>
            </div>
        </div>
    </Modal>
);

ConfirmationDialog.displayName = "ConfirmationDialog";