import styles from "./product-image.module.css";

function ProductImage({ src, alt, bgColor }) {
    return (
        <div className={bgColor ? `${styles.container} --${bgColor}` : styles.container}>
            <img src={src} alt={alt} />
        </div>
    );
}

export default ProductImage;