import { Link } from "react-router-dom";
import { Rating } from '@mui/material';
import { CurrencyFormat } from './CurrencyFormat';
import { ProductImage } from './ProductImage';
import styles from './product.module.css';

function Product({ id, image, title, rating, price, rootClassName, imgClassName }) {

    return (
        <div
            className={`${styles.root}${rootClassName
                ?   (" " + rootClassName)
                :   ""}`
            }>
            <Link to={`/products/${id}`}>
                <ProductImage
                    src={image}
                    alt="Product's image"
                    rootClassName={styles["product-image-root"]}
                    imgClassName={imgClassName}
                />
            </Link>

            <div className={styles.info}>
                <Link className={styles.link} to={`/products/${id}`}>
                    <p className={styles.title}>{title}</p>
                </Link>

                <Rating readOnly value={rating} precision={0.1} size="small" />

                <Link className={styles.link} to={`/products/${id}`}>
                    <CurrencyFormat
                        price={price}
                        rootClassName={styles.currency}
                    />
                </Link>
            </div>

        </div>
    );
}

export default Product;