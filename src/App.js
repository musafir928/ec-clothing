// react, router
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/user.action';
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';

// components
import Home from './routes/home/Home';
import Navigation from './routes/Navigation/Navigation.component';
import Authentication from './routes/authentication/Authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
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
