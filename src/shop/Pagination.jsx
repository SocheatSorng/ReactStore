import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate, activePage }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const visiblePageCount = 5;  // Display 5 page numbers at a time

    // Calculate the range of pages to display based on the current active page
    let startPage = Math.max(1, activePage - Math.floor(visiblePageCount / 2));
    let endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    // Adjust startPage if there's space after the endPage (to ensure the full range of pages is visible)
    if (endPage - startPage + 1 < visiblePageCount) {
        startPage = Math.max(1, endPage - visiblePageCount + 1);
    }

    // Generate the page numbers to display
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='default-pagination lab-ul'>
            {/* Left Arrow */}
            <li>
                <a href="#" onClick={() => {
                    if (activePage > 1) { // Only go to the previous page if we're not on the first page
                        paginate(activePage - 1);
                    }
                }}>
                    <i className="icofont-rounded-left"></i>
                </a>
            </li>

            {/* Page Numbers */}
            {pageNumbers.map((number) => (
                <li key={number} className={`page-item ${number === activePage ? "bg-warning" : ""}`}>
                    <button onClick={() => paginate(number)} className='bg-transparent'>
                        {number}
                    </button>
                </li>
            ))}

            {/* Right Arrow */}
            <li>
                <a href="#" onClick={() => {
                    if (activePage < totalPages) { // Only go to the next page if we're not on the last page
                        paginate(activePage + 1);
                    }
                }}>
                    <i className="icofont-rounded-right"></i>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
