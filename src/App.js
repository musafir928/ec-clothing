// react, router
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//sagas
import { checkUserSession } from './store/user/user.action';

// components
import Home from './routes/home/Home';
import Navigation from './routes/Navigation/Navigation.component';
import Authentication from './routes/authentication/Authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession());
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop/*' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
