import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utilis/fetchProducts';  // Adjust the import path as needed

const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "Get Started Now";

const HomeCategory = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const products = await fetchProducts();
                setAllProducts(products);

                // Extract unique categories from products
                const uniqueCategories = [
                    "All Categories",
                    ...new Set(products.map(product => product.category))
                ];
                setCategoryList(uniqueCategories);

                // Filter products based on selected category
                const filteredProducts = products.filter(product =>
                    selectedCategory === "All Categories" || product.category === selectedCategory
                );

                // Get only one product per category
                const uniqueCategoryProducts = [];
                const seenCategories = new Set();

                filteredProducts.forEach(product => {
                    if (!seenCategories.has(product.category)) {
                        seenCategories.add(product.category);
                        uniqueCategoryProducts.push({
                            imgUrl: product.thumbnail,
                            imgAlt: `Category ${product.title}`,
                            iconName: 'icofont-brand-windows',
                            category: product.category,
                        });
                    }
                });

                setCategoryList(uniqueCategoryProducts);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [selectedCategory]); // Dependency on selectedCategory to re-fetch data when the category changes

    // Handle category selection change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className='category-section style-4 padding-tb'>
            <div className='container'>

                {/* section header */}
                <div className='section-header text-center'>
                    <span className='subtitle'>{subTitle}</span>
                    <h2 className='title'>{title}</h2>
                </div>

                {/* section card */}
                <div className='section-wrapper'>
                    <div className='row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1'>
                        {
                            categoryList.map((val, i) => (
                                <div key={i} className='col'>
                                    <Link to="/shop" className="category-item">
                                        <div className='category-inner'>

                                            {/* image thumbnail */}
                                            <div className='category-thumb'>
                                                <img src={val.imgUrl} alt={val.imgAlt} />
                                            </div>

                                            {/* content */}
                                            <div className='category-content'>
                                                <div className='cate-icon'>
                                                    <i className={val.iconName}></i>
                                                </div>
                                                <Link>
                                                    <h6>{val.category}</h6>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                    {/* btn get started */}
                    <div className='text-center mt-5'>
                        <Link to="/shop" className='lab-btn'><span>{btnText}</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;
