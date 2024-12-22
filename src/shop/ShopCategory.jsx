import React from 'react';

const ShopCategory = ({ filterItem, menuItems, selectedCategory }) => {
    return (
        <>
            <div className="widget-header">
                <h5 className="ms-2">
                    All Categories
                </h5>
            </div>
            <div>
                {
                    menuItems.map((Val, id) => {
                        return (
                            <button 
                                className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""}`} 
                                key={id} 
                                onClick={() => filterItem(Val)}
                            >
                                {Val}
                            </button>
                        );
                    })
                }
            </div>
        </>
    );
}

export default ShopCategory;
