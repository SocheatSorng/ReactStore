import React from "react";
import { Link } from "react-router-dom";

const ProductCards = ({ GridList, products }) => {
  return (
    <div
      className={`shop-product-wrap row justify-content-center ${
        GridList ? "grid" : "list"
      }`}
    >
      {products.map((product, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-12">
          <div className="product-item">
            <div
              className="card border-0 shadow-sm"
              style={{ height: "400px" }}
            >
              {/* Product Image */}
              <div
                style={{
                  height: "250px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <Link
                  to={`/shop/${product.id}`}
                  className="h-100 w-100 d-flex align-items-center justify-content-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </div>

              {/* Product Details */}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <Link
                    to={`/shop/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <h6
                      className="card-title mb-2"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.2",
                      }}
                    >
                      {product.title}
                    </h6>
                  </Link>
                  <p className="price fw-bold mb-2">${product.price}</p>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to={`/shop/${product.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Details
                  </Link>
                  <button className="btn btn-sm btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
