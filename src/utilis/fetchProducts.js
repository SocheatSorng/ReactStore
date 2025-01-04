// fetchProducts.js
export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    // Duplicate products to reach 150 items
    const duplicatedProducts = [];
    const numberOfCopies = Math.ceil(150 / data.length);

    for (let i = 0; i < numberOfCopies; i++) {
      const modifiedProducts = data.map((product) => ({
        ...product,
        id: product.id + i * data.length, // Ensure unique IDs
      }));
      duplicatedProducts.push(...modifiedProducts);
    }

    // Slice to exactly 150 products
    return duplicatedProducts.slice(0, 150);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
