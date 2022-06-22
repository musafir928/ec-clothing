import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/Home';
import Navigation from './components/routes/Navigation/Navigation.component';
import Authentication from './components/routes/authentication/Authentication.component';
import Checkout from './components/routes/checkout/checkout.component';
import Shop from './components/routes/shop/shop.component';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
