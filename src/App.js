import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/Home';
import Navigation from './components/routes/Navigation/Navigation.component';
import SignIn from './components/routes/sign-in/sign-in.component';

const App = () => {
    const Shop = () => <div className=''>I'm the shop</div>;
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='sign-in' element={<SignIn />} />
            </Route>
        </Routes>
    );
};

export default App;
