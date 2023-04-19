import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import styles from "./select.module.css";


export const Select = forwardRef(
    ({ defaultValue, onChange, options, label, className, selectClassName }, fwdRef) => {
        const [value, setValue] = useState(defaultValue);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const isFirstRender = useRef(true);
        const selectRef = useRef(null);

        /**
         * useImperativeHandle(ref, createHandle, [deps])
         * - expose a customized values to forwardRef
         * - createHandle function runs after callback ref ref={selectRef}
         */
        useImperativeHandle(
            fwdRef,
            () => {
                selectRef.current.value = value;
                return selectRef.current;
            }
        );

        useEffect(() => {
            const handleClick = e => {
                e.preventDefault();

                if (!selectRef.current.contains(e.target)) {
                    setIsMenuOpen(false);
                    return;
                }

                if (selectRef.current.querySelector("button").contains(e.target)) {
                    setIsMenuOpen(isOpen => !isOpen);
                    return;
                }

                if (selectRef.current.querySelector("ul")?.contains(e.target)) {
                    setValue(e.target.textContent);
                    setIsMenuOpen(false);
                }
            };

            window.addEventListener("click", handleClick);

            return () => { window.removeEventListener("click", handleClick); }
        }, []);

        useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }

            if (onChange) {
                onChange(value);
            }

        }, [value]);

        return (
            <div ref={selectRef} className={`${styles.root}${className ? " " + className : ""}`}>
                <button type="button" className={`${styles.select}${selectClassName ? (" " + selectClassName) : ""}`}>
                    <span>
                        {label && <span>{label}&#160;&#160;</span>}
                        <span>{value}</span>
                    </span>

                    <svg viewBox="0 0 24 24">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#expand-more`} />
                    </svg>
                </button>
                {
                    isMenuOpen
                        ? <ul className={styles.menu}>
                            {options.map(opt =>
                                    <li
                                        key={opt}
                                        className={value.toString() === opt.toString()
                                            ? `${styles["menu-item"]} --active`
                                            : styles["menu-item"]}
                                    >
                                        <span>{opt}</span>
                                    </li>
                            )}
                        </ul>
                        : null
                }
            </div>
        );
    }
);

Select.displayName = "Select";