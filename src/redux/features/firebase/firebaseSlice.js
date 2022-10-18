import React, { useRef, forwardRef } from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseAuth from "../../../firebase/firebase";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import firebaseConfig from '../../../firebase/firebaseConfig';
import { getAuth, PhoneAuthProvider, signInWithCredential, signInWithCustomToken } from 'firebase/auth';

const initialState = {
    error: {
        errorOccured: false,
        errorMain: '',
        errorBody: ''
    },
    phoneAuth: {
        verificationId: ''
    },
    user: {}
}

export const signUpEmail = createAsyncThunk('firebase/signUpEmail', async({email, password, capRef}) => {
    try
    {
        const auth = firebaseAuth.getAuth()
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
        return {user: userCredential.user}
    }
    catch(err)
    {
        return {errorCode: err.code}
    }
})

export const signUpPhoneNumberVerify = createAsyncThunk('firebase/signUpPhoneNumberVerify', async({verificationId, otp}) => {
    try
    {
        const auth = firebaseAuth.getAuth()
        const credential = PhoneAuthProvider.credential(verificationId, otp)
        const response = await signInWithCredential(auth, credential)
        return response
    } catch (err) {
        return {errorCode: err.code}
    }
})


const firebaseSlice = createSlice({
    name: 'firebase',
    initialState,
    reducers: {
        updateVerificationId: (state, action) => {
            state.phoneAuth.verificationId = action.payload.verificationId
        },
        updateErrorMessage: (state) => {
            state.error.errorBody = ''
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signUpEmail.fulfilled, (state, action) => {
                console.log(' --> signUpEmail fulfilled');
                console.log(action);
                if(action.payload.errorCode)
                {
                    switch(action.payload.errorCode)
                    {
                        case 'auth/email-already-in-use':
                            state.error.errorBody = 'Email already in use. Please use a different email address'
                            break ;
                    }
                }
                if(action.payload.user)
                {
                    state.user = action.payload.user
                }
            })
            .addCase(signUpEmail.rejected, () => {
                console.log(' --> signUpEmail rejected');
            })
            .addCase(signUpPhoneNumberVerify.pending, () => {
                console.log(' --> signUpEmail pending');
            })
            .addCase(signUpPhoneNumberVerify.fulfilled, (state, action) => {
                console.log(' --> singupPhoneNumberVerify fulfilled.');
                console.log(action.payload);
                if(action.payload.errorCode)
                {
                    switch(action.payload.errorCode)
                    {
                        case 'auth/invalid-verification-code':
                            state.error.errorBody = 'Incorrect verification code entered.'
                            break
                        case 'auth/code-expired':
                            state.error.errorBody = 'Verification Code expired. Request a new one.'
                            break
                    }
                }
                if(action.payload._tokenResponse)
                {
                    switch(action.payload._tokenResponse.isNewUser)
                    {
                        case true: state.user = action.payload.user
                        break ;
                        case false: state.error.errorBody = 'Phone number already is use. Please use a different phone number.'
                                     break
                    }
                }
            })
            .addCase(signUpPhoneNumberVerify.rejected, (state, action) => {
                console.log(' --> SignedIn Unsuccessful');
                console.log(action.payload);
            })

    }
})

export const { updateVerificationId, updateErrorMessage } = firebaseSlice.actions

export default firebaseSlice.reducer