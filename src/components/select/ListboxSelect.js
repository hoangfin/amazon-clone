import styles from "./listbox-select.module.css";

export function ListboxSelect({ options, onChange }) {
    return (
        <ul className={styles}>
            {options.map(option =>
                <li onClick={e => onChange(e)}>

                </li>
            )}
        </ul>
    )
}
