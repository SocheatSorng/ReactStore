import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { fetchProducts } from '../utilis/fetchProducts';
import ProductCards from './ProductCards';
import Pagination from './Pagination';
import Search from './Search';
import ShopCategory from './ShopCategory';

const Shop = () => {
    const [GridList, setGridList] = useState(true);
    const [products, setProducts] = useState([]); // This holds the filtered products
    const [allProducts, setAllProducts] = useState([]); // This holds the initial unfiltered products
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories"); // Default category is "All Categories"

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // function to change the current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Fetch products and set categories
    useEffect(() => {
        const getProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setAllProducts(fetchedProducts); // Store all products
            setProducts(fetchedProducts); // Set products initially to all
            // Extract unique categories from products
            const uniqueCategories = [
                "All Categories",
                ...new Set(fetchedProducts.map((product) => product.category)),
            ];
            setCategories(uniqueCategories);
        };

        getProducts();
    }, []);

    // Filter products based on selected category
    const filterItem = (curcat) => {
        setSelectedCategory(curcat);

        if (curcat === "All Categories") {
            setProducts(allProducts); // Reset products to all when "All Categories" is selected
        } else {
            const filteredProducts = allProducts.filter((product) => product.category === curcat);
            setProducts(filteredProducts); // Set filtered products
        }
    };

    // Calculate the range of products displayed
    const totalProducts = products.length;
    const displayFrom = indexOfFirstProduct + 1;
    const displayTo = Math.min(indexOfLastProduct, totalProducts);

    const showResults = `Showing ${displayFrom} - ${displayTo} of ${totalProducts} Results`;

    return (
        <div>
            <PageHeader title="Our Shop Page" curPage="Shop" />

            {/* shop page */}
            <div className="shop-page padding-tb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-12">
                            <article>
                                {/* layout and title here */}
                                <div className="shop-title d-flex flex-warp justify-content-between">
                                    <p>{showResults}</p>
                                    <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                                        <a className="grid" onClick={() => setGridList(!GridList)}>
                                            <i className="icofont-ghost"></i>
                                        </a>
                                        <a className="list" onClick={() => setGridList(!GridList)}>
                                            <i className="icofont-listine-dots"></i>
                                        </a>
                                    </div>
                                </div>

                                {/* product cards */}
                                <div>
                                    <ProductCards GridList={GridList} products={currentProducts} />
                                </div>

                                <Pagination 
                                    productsPerPage={productsPerPage}
                                    totalProducts={totalProducts}
                                    paginate={paginate}
                                    activePage={currentPage}
                                />
                            </article>
                        </div>
                        <div className="col-lg-4 col-12">
                            <aside>
                                <Search products={products} GridList={GridList} />
                                <ShopCategory 
                                    filterItem={filterItem} 
                                    menuItems={categories} 
                                    selectedCategory={selectedCategory} // Adding selectedCategory to highlight active button
                                />
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;



