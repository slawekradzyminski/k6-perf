import { Product } from "../types/productTypes";

export const getRandomProduct = (products: Product[]): Product => {
    const filteredProducts = products.filter(product => product.description.startsWith('Performance'));

    if (filteredProducts.length === 0) {
        throw new Error('No products found with description starting with "Performance"');
    }

    const randomIndex = Math.floor(Math.random() * filteredProducts.length);
    return filteredProducts[randomIndex];
};