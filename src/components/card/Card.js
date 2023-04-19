import { memo } from "react";
import style from "./card.module.css";

export const Card = memo(
    ({ media, content, mediaOverlayColor, className, mediaClassName, contentClassName }) =>
        <div className={`${style.root}${className ? " " + className : ""}`}>
            <div
                className={
                    style.media +
                    (mediaOverlayColor ? " --overlay-" + mediaOverlayColor : "") +
                    (mediaClassName ? " " + mediaClassName : "")
                }
            >
                {media}
            </div>
            <div className={style.content + (contentClassName ? " " + contentClassName : "")}>{content}</div>
        </div>
);

Card.displayName = "Card";