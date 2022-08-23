import React, { useEffect, useState, useRef } from 'react';
import './Select.css';

function Select({ options, initSelectedOption = options[0], onChange }) {

    const ref = useRef(null);
    const listRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(initSelectedOption);
    const [areOptionsVisible, setAreOptionsVisible] = useState(false);

    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setAreOptionsVisible(false);
            return;
        }

        // Click inside div 'select'
        if (listRef.current && listRef.current.contains(e.target)) {
            e.preventDefault();
            setSelectedOption(e.target.innerText);
            onChange(e.target.innerText);
            setAreOptionsVisible(false);
        }
    }

    const toggle = e => setAreOptionsVisible(!areOptionsVisible);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div ref={ref} className='select'>
            <div className='select__button' onClick={toggle}>
                <span className='select__label'>Qty: {selectedOption}</span>
                <span className='select__dropdown-icon'></span>
            </div>
            {areOptionsVisible && <ul ref={listRef} className='select__options-list'>
                                    {options.map(option =>
                                        <li className='select__option'>
                                            <a onClick={handleClick} className={selectedOption === option ? 'select__link select__link--active' : 'select__link'}>{option}</a>
                                        </li>
                                    )}
                                   </ul>}
        </div>
    )
}

export default Select;