import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDisplay = ({ item }) => {
    const { title, id, price, brand, stock, description, images } = item;
    const [prequantity, setQuantity] = useState(0); // Start with 0, representing no items selected
    const [coupon, setCoupon] = useState("");
    const [size, setSize] = useState("Select Size");
    const [color, setColor] = useState("Select Color");

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleDecrease = () => {
        if (prequantity > 0) {
            setQuantity(prequantity - 1);
        }
    };

    const handleIncrease = () => {
        if (prequantity < stock) { // Limit to the available stock
            setQuantity(prequantity + 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            id: id,
            img: images,
            name: title,
            price: price,
            quantity: prequantity,
            size: size,
            color: color,
            coupon: coupon,
        };

        // Retrieve cart from local storage or initialize a new one
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const existingProductIndex = existingCart.findIndex((item) => item.id === id);

        if (existingProductIndex !== -1) {
            existingCart[existingProductIndex].quantity += prequantity;
        } else {
            existingCart.push(product);
        }

        // Update local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));

        // Reset form fields
        setQuantity(1);
        setSize("Select Size");
        setColor("Select Color");
        setCoupon("");
    };

    return (
        <div>
            <div>
                <h4>{title}</h4>
                <h4>${price}</h4>
                <h6>{brand}</h6>
                <p>{description}</p>
            </div>

            {/* Cart component */}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="select-product size">
                        {/* Size */}
                        <select value={size} onChange={handleSizeChange}>
                            <option>Select Size</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>Very Large</option>
                            <option>Extra Large</option>
                        </select>
                        <i className="icofont-rounded-down"></i>
                    </div>

                    {/* Color */}
                    <div className="select-product color">
                        <select value={color} onChange={handleColorChange}>
                            <option>Select Color</option>
                            <option>Red</option>
                            <option>Yellow</option>
                            <option>Green</option>
                            <option>White</option>
                            <option>Black</option>
                        </select>
                        <i className="icofont-rounded-down"></i>
                    </div>

                    {/* Cart plus-minus */}
                    <div className="cart-plus-minus">
                        <div className="dec qtybutton" onClick={handleDecrease}>-</div>
                        <input
                            className="cart-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            id="qtybutton"
                            value={prequantity}
                            onChange={(e) => {
                                const newValue = Math.max(0, Math.min(stock, parseInt(e.target.value, 10) || 0));
                                setQuantity(newValue);
                            }}
                        />
                        <div className="inc qtybutton" onClick={handleIncrease}>+</div>
                    </div>
                    
                    {/* Coupon field */}
                    <div className="discount-code mb-2">
                        <input type="text" placeholder="Enter Discount Code" onChange={(e) => setCoupon(e.target.value)} />
                    </div>

                    {/* Button section */}
                    <button type="submit" className="lab-btn"><span>Add to Cart</span></button>
                    <Link to="/cart-page" className="lab-btn bg-primary">Check Out<span></span></Link>
                </form>
            </div>
        </div>
    );
};

export default ProductDisplay;
