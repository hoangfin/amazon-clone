import styles from "./product-image.module.css";

function ProductImage({ src, alt, rootClassName, imgClassName }) {
    return (
        <div
            className={
                `${styles.root}${rootClassName ? (" " + rootClassName) : ""}`
            }>
            <img
                src={src} alt={alt}
                className={
                    `${styles.img}${imgClassName ? (" " + imgClassName) : ""}`
                } />
        </div>
    );
}

export default ProductImage;