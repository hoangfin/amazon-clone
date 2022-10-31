import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { signOut } from './firebase';
import ShoppingCart from './ShoppingCart';
import SearchForm from './SearchForm';
import { useCurrentUser } from './store';

function Header() {
    const currentUser = useCurrentUser();

    console.log("Header component is rendered");

    const handleAuthentication = () => {
        if (currentUser) {
            signOut();
        }
    };

  return (
    <header className='header'>
        <div className='header__logobar'>
            <div className='header__logobar-left'>
                <span className='header__menu-icon'></span>
                <Link to='/'>
                    <span className='header__logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'></span>
                </Link>
                <SearchForm />
            </div>

            <div className='header__logobar-right'>
                <Link to={!currentUser && '/login'}>
                    <div onClick={handleAuthentication} className='header__option'>
                        <span className='header__option-line-1'>Hello, {currentUser ? currentUser.email : 'Sign in'}</span>
                        <span className='header__option-line-2'>Account &#38; Lists</span>
                    </div>
                    <div onClick={handleAuthentication} className='header__signin'>
                        {currentUser ? currentUser.email : 'Sign in >'}
                        <span className='header__account-icon'></span>
                    </div>
                </Link>

                <Link to={currentUser ? '/orders' : '/login'} className='header__option'>
                    <span className='header__option-line-1'>Returns</span>
                    <span className='header__option-line-2'>&#38; Orders</span>
                </Link>

                <Link to="/checkout">
                    <ShoppingCart />
                </Link>
            </div>
        </div>

        <div className='header__search-bar'>
            <SearchForm />
        </div>

        {/* visible on small screen */}
        <ul className='header__category'>
            <li className='header__category-item'><a>Amazon Basics</a></li>
            <li className='header__category-item'><a>Deals</a></li>
            <li className='header__category-item'><a>Best Sellers</a></li>
            <li className='header__category-item'><a>Prime</a></li>
            <li className='header__category-item'><a>Livestreams</a></li>
            <li className='header__category-item'><a>Video</a></li>
            <li className='header__category-item'><a>New Releases</a></li>
            <li className='header__category-item'><a>Home</a></li>
            <li className='header__category-item'><a>Books</a></li>
            <li className='header__category-item'><a>Luxury Stores</a></li>
            <li className='header__category-item'><a>Pharmacy</a></li>
            <li className='header__category-item'><a>Health &#38; Household</a></li>
            <li className='header__category-item'><a>PC</a></li>
            <li className='header__category-item'><a>Amazon Explore</a></li>
            <li className='header__category-item'><a>Music</a></li>
        </ul>

        {/* visible on large screen */}
        <ul className='header__category'>
            <li className='header__category-item'><a>All</a></li>
            <li className='header__category-item'><a>Today's Deals</a></li>
            <li className='header__category-item'><a>Customer Service</a></li>
            <li className='header__category-item'><a>Registry</a></li>
            <li className='header__category-item'><a>Gift Cards</a></li>
            <li className='header__category-item'><a>Sell</a></li>
        </ul>

        <div className='header__location'>
            <span className='header__location-icon'></span>
            <span className='header__location-text'>Deliver to location</span>
        </div>
    </header>
  )
}

export default Header;