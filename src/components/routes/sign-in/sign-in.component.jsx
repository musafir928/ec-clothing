import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from '../../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
    };
    return (
        <div className=''>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}> Sign In With Google Popup</button>
        </div>
    );
};

export default SignIn;
