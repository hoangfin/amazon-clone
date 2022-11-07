import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./select.module.css";

function Select({ label, defaultValue, options, onChange }) {

    const [value, setValue] = useState(defaultValue || options[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const rootNode = useRef(null);
    const setRootNode = useCallback(node => {
        if (rootNode.current) {
            window.removeEventListener("click", handleClick);
        }

        if (node) {
            window.addEventListener("click", handleClick);
        }

        rootNode.current = node;
    }, []);

    const handleClick = useCallback(e => {
        e.preventDefault();

        if (!rootNode.current.contains(e.target)) {
            setIsMenuOpen(false);
            return;
        }

        if (rootNode.current.querySelector("button").contains(e.target)) {
            setIsMenuOpen(isOpen => !isOpen);
            return;
        }

        if (rootNode.current.querySelector("ul")?.contains(e.target)) {
            setValue(e.target.textContent);
            setIsMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value]);

    return (
        <div ref={setRootNode} className={styles.root}>
            <button type="button" className={styles.select}>
                {label && <span>{label}</span>}
                <span>{value}</span>
                <svg viewBox="0 0 24 24">
                    <use xlinkHref="/sprites.svg#expand-more" />
                </svg>
            </button>
            {
                isMenuOpen &&
                <ul className={styles.menu}>
                    {
                        options.map(opt =>
                            <li key={opt}
                                className={value.toString() === opt.toString()
                                    ? `${styles["menu-item"]} --active`
                                    : styles["menu-item"]}>
                                <span>{opt}</span>
                            </li>
                        )
                    }
                </ul>
            }
        </div>
    )
}

export default Select;