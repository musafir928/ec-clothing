import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({ children }) => {
    useEffect(() => {
        getCategoriesAndDocuments();
    });

    const [products, setProducts] = useState([]);
    const value = { products };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
