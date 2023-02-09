import { memo } from "react";
import { useStore } from "hooks";
import { cartStore } from "stores";
import { ReviewList } from "components/product";

const Component = () => {
    const [items] = useStore(cartStore);

    if (!items.length) return null;

    return <ReviewList products={items}/>;
};

export const ReviewItems = memo(Component, () => true);
