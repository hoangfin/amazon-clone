import objectResolvePath from "object-resolve-path";

export const List = ({
    items,
    keyPath,
    itemComponent: ItemComponent,
    resourceName,
    className,
    liClassName,
    itemClassName
}) =>
    <ul className={className}>
        {items.map(item =>
            <li
                key={keyPath ? objectResolvePath(item, keyPath) : item}
                className={liClassName}
            >
                {
                    ItemComponent
                    ?   <ItemComponent
                            {...{ [resourceName]: item }}
                            className={itemClassName}
                        />
                    :   item
                }
            </li>
        )}
    </ul>;
