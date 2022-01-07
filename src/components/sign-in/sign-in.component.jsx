import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({
    emailSignInStart,
    googleSignInStart,
}) => {
    const dispatch = useDispatch();
    const googleSignInStartClickHandler = () => dispatch(googleSignInStart());
    const emailSignInStartHandler = (email, password) => dispatch(emailSignInStart({email, password}))

    const [ userCredentials, setCredentials ] = useState({
        email: '',
        password: '',
    })

    const { email, password } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();

        emailSignInStartHandler(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({
            ...userCredentials,
            [name]: value,
        })
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with youe email and password</span>


            <form
                onSubmit={handleSubmit}
            >
                <FormInput 
                    name="email" 
                    type="email" 
                    handleChange={handleChange}
                    value={email} 
                    label="email"
                    required
                />

                <FormInput 
                    name="password"
                    type="password"
                    handleChange={handleChange}
                    value={password}
                    label="password"
                    required 
                />

                <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton 
                        type='button'
                        onClick={googleSignInStartClickHandler} 
                        isGoogleSignIn
                    >
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;
