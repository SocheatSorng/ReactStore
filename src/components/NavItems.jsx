import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";

const NavItems = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  // addevent listener
  window.addEventListener("scroll", () => {
    if (window.scroll > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });
  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      {/* header top start */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link
              to="/signup"
              className={`lab-btn me-3 ${!isHomePage && "text-white"}`}
            >
              <span>Create Account</span>
            </Link>
            <Link
              to="/login"
              className={`text-decoration-none ${!isHomePage && "text-white"}`}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* header bottom */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>

            {/* menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link
                      to="/"
                      className={`text-decoration-none ${
                        !isHomePage && "text-white"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={`text-decoration-none ${
                        !isHomePage && "text-white"
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`text-decoration-none ${
                        !isHomePage && "text-white"
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`text-decoration-none ${
                        !isHomePage && "text-white"
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`text-decoration-none ${
                        !isHomePage && "text-white"
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              {/* sign in & log in */}
              <Link
                to="/sign-up"
                className={`lab-btn me-3 d-none d-md-block ${
                  !isHomePage && "text-white"
                }`}
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className={`d-none d-md-block text-decoration-none ${
                  !isHomePage && "text-white"
                }`}
              >
                Log In
              </Link>

              {/* menu toggler */}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler */}
              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
