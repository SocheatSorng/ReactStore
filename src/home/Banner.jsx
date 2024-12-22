import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SelectedCategory from '../components/SelectedCategory';

const title = (
    <h2>Search Your One From <span>Thousand</span> of Products</h2>
);

const desc = "We have the largest collection of products";
const bannerList = [
    {
        iconName: "icofont-users-alt-4",
        text: "1.5 Million Customers",
    },
    {
        iconName: "icofont-notification",
        text: "More then 2000 Merchants",
    },
    {
        iconName: "icofont-globe",
        text: "Buy Anything Online",
    },
];

const Banner = () => {
    const [searchInput, setSearchInput] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const productData = await response.json();
                setProducts(productData.products);
                setFilteredProduct(productData.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Search functionality
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchInput(searchTerm);

        // Filter products based on search term
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProduct(filtered);
    };


    return (
        <div className='banner-section style-4'>
            <div className='container'>
                <div className='banner-content'>
                    {title}
                    <form>
                        <SelectedCategory select={"all"}/>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search your product"
                            value={searchInput}
                            onChange={handleSearch}
                        />
                        <button type="submit">
                            <i className='icofont-search'></i>
                        </button>
                    </form>
                    <p>{desc}</p>
                    <ul className='lab-ul'>
                        {
                            searchInput && filteredProduct.map((product, i) => (
                                <li key={i}>
                                    <Link to={`/shop/${product.id}`}>{product.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Banner;
