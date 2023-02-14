import { Link } from "react-router-dom";
import { cartStore } from "stores";

const addProduct = useCallback(() => add(product, 1), []);

export const CompactList = memo(({ products, className }) => {
    if (!products) return null;
    
    return (
        <ul className={style.root + (className ? " " + className : "")}>
            {products.map(product =>
                <li key={product.id} className={style["list-item"]}>
                    <Link to={`/products/${product.id}`}>
                        <img src={product.imageURLs[0]} />
                    </Link>
                    <Link to={`/products/${product.id}`}>
                        {product.title}
                    </Link>
                    <Rating
                        readonly
                        value={product.rating}
                        precision={0.1}
                        size="small"
                    />
                    <Button onClick={addProduct} className={style["add-button"]}>
                        Add to Cart
                    </Button>
                </li>
            )}
        </ul>
    );
});
/* id: product.id,
    title: product.title,
    imageURL: product.imageURLs[0],
    price: product.price,
    rating: product.rating */