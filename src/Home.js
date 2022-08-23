import React from 'react';
import './Home.css';
import Product from "./Product.js";

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            {/* <img className='home__image'
            src='https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg' /> */}

            <div className='home__product'>
                <Product
                    id='product-1'
                    image='https://m.media-amazon.com/images/I/71edE2j5zLL._AC_SX296_SY426_FMwebp_QL65_.jpg'
                    title='Acer Aspire 5 A515-56-32DK Slim Laptop | 15.6" Full HD IPS Display | 11th Gen Intel Core i3-1115G4 Processor | 4GB DDR4 | 128GB NVMe SSD | WiFi 6 | Windows 11 Home in S mode'
                    rating={4}
                    price={289.99}
                />

                <Product
                    id='product-2'
                    image='https://m.media-amazon.com/images/I/719pUQCxnmL._AC_SX296_SY426_FMwebp_QL65_.jpg'
                    title='Waterpik Aquarius Water Flosser Professional For Teeth, Gums, Braces, Dental Care,
                           Electric Power With 10 Settings, 7 Tips For Multiple Users And Needs, ADA Accepted, White WP-660'
                    rating={4.5}
                    price={59.99}
                />

                <Product
                    id='product-3'
                    image='https://m.media-amazon.com/images/I/81L8fk7SGQL._AC_SX296_SY426_FMwebp_QL65_.jpg'
                    title='SteelSeries Apex 3 RGB Gaming Keyboard – 10-Zone RGB Illumination – IP32 Water Resistant –
                           Premium Magnetic Wrist Rest (Whisper Quiet Gaming Switch)'
                    rating={4.5}
                    price={48.99}
                />

                <Product
                    id='product-4'
                    image='https://m.media-amazon.com/images/I/61vtF1VqiHL._AC_UX695_.jpg'
                    title="Naturalizer Women's Taimi Dress Sandal"
                    rating={4}
                    price={64.76}
                />

                <Product
                    id='product-5'
                    image='https://m.media-amazon.com/images/I/81j6WEBECXL._AC_SX296_SY426_QL65_.jpg'
                    title="Livingston Men &#38; Women's Woven Straw Cowboy Hat w/Hat Band"
                    rating={4.5}
                    price={32.99}
                />

                <Product
                    id='product-6'
                    image='https://m.media-amazon.com/images/I/A1akbwS8aRL._AC_SX296_SY426_QL65_.jpg'
                    title="Nautica Diver Nylon Small Womens Crossbody Bag Purse with Adjustable Shoulder Strap"
                    rating={4.5}
                    price={21.80}
                />

                <Product
                    id='product-7'
                    image='https://m.media-amazon.com/images/I/A1cczIB-pOL._AC_AA720_FMwebp_QL65_.jpg'
                    title="Amazon Basics Swivel Foam Lounge Chair - with Headrest, Adjustable, Grey"
                    rating={4.5}
                    price={126.50}
                />

                <Product
                    id='product-8'
                    image='https://m.media-amazon.com/images/I/81Wse9-U3aL._AC_AA720_FMwebp_QL65_.jpg'
                    title="AVF SDC800-A TV Stand for Up to 42-Inch TVs, Black Glass, Chrome Legs"
                    rating={4.5}
                    price={68.42}
                />

                <Product
                    id='product-9'
                    image='https://m.media-amazon.com/images/I/71L2i2B4DIL._AC_SX296_SY426_QL65_.jpg'
                    title="CeraVe PM Facial Moisturizing Lotion | Night Cream with Hyaluronic Acid and Niacinamide |
                           Ultra-Lightweight, Oil-Free Moisturizer for Face | 3 Ounce"
                    rating={4.5}
                    price={13.97}
                />

                <Product
                    id='product-10'
                    image='https://m.media-amazon.com/images/I/51RG7RX3u9L._AC_SX296_SY426_QL65_.jpg'
                    title="H&#38;C Women Premium Nylon Ponte Stretch Office Pencil Skirt Made Below Knee Made in The USA"
                    rating={4}
                    price={20.99}
                />

                <Product
                    id='product-11'
                    image='https://m.media-amazon.com/images/I/71jbI3FiWLL._AC_SR350,526_FMwebp_QL65_.jpg'
                    title="Café Bellissimo Semi Automatic Espresso Machine + Milk Frother | WiFi Connected,
                           Smart Home Kitchen Essentials | Built-In Bean Grinder, 15-Bar Pump &#38; 95-Ounce Water Reservoir |
                           Matte White"
                    rating={4}
                    price={679}
                />

                <Product
                    id='product-12'
                    image='https://m.media-amazon.com/images/I/81EZ1yPsAzL._AC_SR350,526_FMwebp_QL65_.jpg'
                    title="Hamilton Beach Electric Indoor Searing Grill Removable Easy-To-Clean Nonstick Plate, 6-Serving,
                           Extra-Large Drip Tray, Stainless Steel (25360)"
                    rating={5}
                    price={67.49}
                />

            </div>
        </div>
    </div>
  )
}

export default Home;