import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import { UserContext } from '../../../contexts/user.context';
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
    };

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo'></CrownLogo>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                    {currentUser ? (
                        <span className='nav-link' onClick={signOutHandler}>
                            Sign Out
                        </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            Sign In
                        </Link>
                    )}
                    <CartIcon />
                </div>
                <CartDropdown />
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
