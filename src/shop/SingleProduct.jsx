import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

// Import Swiper React Components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import ProductDisplay from './ProductDisplay';

const SingleProduct = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=194")
            .then(res => res.json())
            .then(data => setProduct(data.products)); // Correctly set the products array
    }, []);

    const result = product.find((p) => p.id === parseInt(id));

    if (!result) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <PageHeader title={"Our Shop Single"} curPage={"Shop / Single Product"} />
            <div className="shop-single padding-tb aside-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* left side */}
                        <div className='col-lg-8 col-12'>
                            <article>
                                <div className="product-details">
                                    <div className="row align-items-center">
                                        <div className="col-md-6 col-12">
                                            <div className="product-thumb">
                                                <div className="swiper-container pro-single-top">
                                                    {/* Swiper to display all images */}
                                                    <Swiper
                                                        spaceBetween={30}
                                                        slidesPerView={1}
                                                        loop={result.images.length > 1} // Loop only if more than one image
                                                        autoplay={{
                                                            delay: 2000,
                                                            disableOnInteraction: false
                                                        }}
                                                        navigation={{
                                                            prevEl: ".pro-single-prev",
                                                            nextEl: ".pro-single-next",
                                                        }}
                                                        modules={[Navigation, Autoplay]}
                                                        className='mySwiper'
                                                    >
                                                        {result.images.map((image, index) => (
                                                            <SwiperSlide key={index}>
                                                                <div className="single-thumb">
                                                                    <img src={image} alt={`${result.title} ${index + 1}`} />
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>

                                                    {/* Navigation buttons */}
                                                    <div className="pro-single-prev">
                                                        <i className="icofont-rounded-left"></i>
                                                    </div>
                                                    <div className="pro-single-next">
                                                        <i className="icofont-rounded-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="post-content">
                                                <div>
                                                    {result && <ProductDisplay item={result} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        {/* Right side (if needed) */}
                        {/* <div className='col-lg-4 col-12'>Right Side</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
