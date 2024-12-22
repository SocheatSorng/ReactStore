import React, { useState, useEffect } from 'react';

const SelectedCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();

                // Extract categories from products and get unique values
                const uniqueCategories = [
                    "All Categories",
                    ...new Set(data.products.map(product => product.category))
                ];

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <select>
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
};

export default SelectedCategory;
