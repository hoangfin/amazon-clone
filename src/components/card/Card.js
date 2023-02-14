import { memo } from "react";
import style from "./card.module.css";

export const Media = memo(() => {
    
});

const Component = ({
    media,
    content,
    mediaOverlayColor,
    className,
    mediaClassName,
    contentClassName
}) =>
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
        <div
            className={
                `${style.content}${contentClassName ? " " + contentClassName : ""}`
            }
        >
            {content}
        </div>
    </div>
;

export const Card = memo(Component);