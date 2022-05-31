import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../../utils/firebase/firebase.utils';

import SignUpForm from '../../sign-up-form/sign-up-form.component';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };

    return (
        <div className=''>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}> Sign In With Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;
