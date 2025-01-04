import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../utilis/fetchProducts"; // Adjust the import path as needed

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
          ...new Set(products.map((product) => product.category)),
        ];
        setCategoryList(uniqueCategories);

        // Filter products based on selected category
        const filteredProducts = products.filter(
          (product) =>
            selectedCategory === "All Categories" ||
            product.category === selectedCategory
        );

        // Get only one product per category
        const uniqueCategoryProducts = [];
        const seenCategories = new Set();

        filteredProducts.forEach((product) => {
          if (!seenCategories.has(product.category)) {
            seenCategories.add(product.category);
            uniqueCategoryProducts.push({
              imgUrl: product.image,
              imgAlt: `Category ${product.title}`,
              iconName: "icofont-brand-windows",
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
    <div className="category-section style-4 padding-tb">
      <div className="container">
        {/* section header */}
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>

        {/* section card */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center align-items-center row-cols-md-4 row-cols-sm-2 row-cols-1">
            {categoryList.map((val, i) => (
              <div key={i} className="col d-flex justify-content-center">
                <Link
                  to={`/shop?category=${val.category}`}
                  className="text-decoration-none"
                  style={{ width: "100%", maxWidth: "280px" }}
                >
                  <div
                    className="card border-0 shadow-sm"
                    style={{ height: "320px" }}
                  >
                    {/* image thumbnail */}
                    <div
                      className="card-img-top"
                      style={{
                        height: "220px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                      }}
                    >
                      <img
                        src={val.imgUrl}
                        alt={val.imgAlt}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* content */}
                    <div className="card-body text-center py-3">
                      <div className="mb-2">
                        <i className={`${val.iconName} fs-3`}></i>
                      </div>
                      <h6 className="card-title text-capitalize mb-0">
                        {val.category}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* btn get started */}
          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-lg btn-primary">
              <span>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
