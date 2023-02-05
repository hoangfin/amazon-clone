import { memo } from "react";
import { useStore } from "hooks";
import { cartStore } from "stores";
import { ReviewListItem } from "components/product";

const Component = () => {
    const [cart] = useStore(cartStore);

    if (!cart.length) return null;

    return (
        <ul>
            {cart.map(item =>
                <li key={item.id}>
                    <ReviewListItem {...item} />
                </li>
            )}
        </ul>
    )
};

export const ReviewItems = memo(Component);
