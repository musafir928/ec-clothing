import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../../store/categories/categories.action';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>
            <Route path=':category' element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;
