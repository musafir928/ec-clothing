import { useState } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const initialFormData = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { email, password } = formData;

    const resetFormData = () => {
        setFormData(initialFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = signInAuthUserWithEmailAndPassword(email, password);
            resetFormData();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.error(`Sign in failed, error: ${error}`);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        await createUserDocumentFromAuth(response.user);
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                    label='email'
                />

                <FormInput
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                    label='password'
                />

                <div className='buttons-container'>
                    <Button type='submit' buttonType='sign-in'>
                        Sign In
                    </Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
