import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <form className='search-form'>
        <input type='text' placeholder='Search Amazon' className='search-form__input' />
        <button className='search-form__button'>
            <span className='search-form__icon'></span>
        </button>
    </form>
  )
}

export default SearchForm;