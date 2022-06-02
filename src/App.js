import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/Home';
import Navigation from './components/routes/Navigation/Navigation.component';
import Authentication from './components/routes/authentication/Authentication.component';

const App = () => {
    const Shop = () => <div className=''>I'm the shop</div>;
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
            </Route>
        </Routes>
    );
};

export default App;
