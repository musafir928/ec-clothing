import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import { UserContext } from '../../../contexts/user.context';
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
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
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
