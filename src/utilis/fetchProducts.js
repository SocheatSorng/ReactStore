// fetchProducts.js
export const fetchProducts = async () => {
    const limit = 30;
    const totalProducts = 194;
    const products = [];
    
    try {
        for (let skip = 0; skip < totalProducts; skip += limit) {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const data = await response.json();
            products.push(...data.products);
        }

        console.log(products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
