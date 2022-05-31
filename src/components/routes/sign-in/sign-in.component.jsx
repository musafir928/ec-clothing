import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../../utils/firebase/firebase.utils';

const SignIn = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };

    return (
        <div className=''>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}> Sign In With Google Popup</button>
            <button onClick={signInWithGoogleRedirect}> Sign In With Google With Redirect</button>
        </div>
    );
};

export default SignIn;
