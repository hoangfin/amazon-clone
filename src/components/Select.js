import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./select.module.css";

function Select({ label, defaultValue, options, onChange }) {

    const root = useRef(null);
    const [value, setValue] = useState(defaultValue || options[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const rootRef = root.current;

        const handleClick = e => {
            e.preventDefault();

            if (!rootRef.contains(e.target)) {
                setIsMenuOpen(false);
                return;
            }

            if (rootRef.querySelector("button").contains(e.target)) {
                setIsMenuOpen(isOpen => !isOpen);
                return;
            }

            if (rootRef.querySelector("ul")?.contains(e.target)) {
                setValue(e.target.textContent);
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        }

    }, []);

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value]);

    return (
        <div ref={root} className={styles.root}>
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