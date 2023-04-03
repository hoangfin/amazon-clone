import { memo } from "react";
import style from "./list.module.css";

export const ListItem = memo(({ className, children }) =>
    <li className={className}>{children}</li>
);

ListItem.displayName = "ListItem";

export const List = memo(({ items, itemComponent, className }) => {
    if (!items?.length) return null;

    return (
        <ul className={style.root + (className ? " " + className : "")}>
            {items.reduce(
                (acc, item, index) => {
                    const component = itemComponent(item, index);
                    if (component.type.displayName === ListItem.displayName) {
                        acc.push(component);
                    }
                    return acc;
                },
                []
            )}
        </ul>
    );
});

List.displayName = "List";