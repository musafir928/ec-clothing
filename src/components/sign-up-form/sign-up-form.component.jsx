import { useState } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

const initialFormData = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { displayName, email, password, confirmPassword } = formData;

    const resetFormData = () => {
        setFormData(initialFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            const userDocRef = await createUserDocumentFromAuth(user, { displayName });
            resetFormData();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.error('user creation encountered an error', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className=''>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                    label='displayName'
                />

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

                <label htmlFor=''>Confirm Password</label>
                <FormInput
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                    label='confirmPassword'
                />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
