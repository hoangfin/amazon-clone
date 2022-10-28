import React, { useEffect, useState, useRef } from 'react';
import styles from './quantity-select.module.css';

function QuantitySelect({ value = 1, limit = 9, onChange }) {

    const isInitialRender = useRef(true);
    const root = useRef(null);
    const [quantity, setQuantity] = useState(value);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleClick = e => {
            e.preventDefault();

            if (!root.current.contains(e.target)) {
                setIsMenuOpen(false);
                return;
            }

            if (root.current.querySelector("button").contains(e.target)) {
                setIsMenuOpen(isOpen => !isOpen);
                return;
            }

            if (root.current.querySelector("ul")?.contains(e.target)) {
                setQuantity(parseInt(e.target.textContent));
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    useEffect(() => {
        if (!isInitialRender.current && onChange) {
            onChange(quantity);
        }
        isInitialRender.current = false;
    }, [quantity, onChange]);

    return (
        <div ref={root} className={styles.root}>
            <button type="button" className={styles.select}>
                <span>Qty: {quantity}</span>
                <svg viewBox="0 0 24 24">
                    <use xlinkHref="/sprites.svg#expand-more" />
                </svg>
            </button>
            {
                isMenuOpen &&
                <ul className={styles.menu}>
                    {
                        Array.from({ length: limit }, (_, index) =>
                            <li key={index + 1}
                                className={quantity === parseInt(index + 1)
                                    ? `${styles["menu-item"]} --active`
                                    : styles["menu-item"]}>
                                <span>{index + 1}</span>
                            </li>
                        )
                    }
                </ul>
            }
        </div>
    )
}

export default QuantitySelect;