import React, { useRef, forwardRef } from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseAuth from "../../../firebase/firebase";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import firebaseConfig from '../../../firebase/firebaseConfig';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const initialState = {
    error: {
        errorOccured: true,
        errorMain: '',
        errorBody: ''
    },
    phoneAuth: {
        verificationId: ''
    }
}

export const signUpEmail = createAsyncThunk('firebase/signUpEmail', async({email, password, capRef}) => {
    try
    {
        const auth = firebaseAuth.getAuth()
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
        console.log('Status OK');
        return userCredential.user
    }
    catch(err)
    {
        if(err.code === 'auth/email-already-in-use')
        {
            return 'EMAIL_ALREADY_IN_USE'
        }
        console.log('Status NOT OK');
    }
})

export const signUpPhoneNumberVerify = createAsyncThunk('firebase/signUpPhoneNumberVerify', async({verificationId, otp}) => {
    const auth = firebaseAuth.getAuth()
    const credential = PhoneAuthProvider.credential(verificationId, otp)
    await signInWithCredential(auth, credential)
})


const firebaseSlice = createSlice({
    name: 'firebase',
    initialState,
    reducers: {
        updateVerificationId: (state, action) => {
            state.phoneAuth.verificationId = action.payload.verificationId
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signUpEmail.fulfilled, (state, action) => {
                console.log(' --> fulfilled');
                switch(action.payload)
                {
                    case 'EMAIL_ALREADY_IN_USE':
                        console.log('--> changing state');
                        state.error = { errorOccured: true, errorMain: 'E-Mail Already in use', errorBody: 'Please use a different Email account' }
                    default :
                        state.error = { errorOccured: false, errorMain: '', errorBody: ''}
                }
            })
            .addCase(signUpEmail.rejected, () => {
                console.log(' --> rejected');
            })
            .addCase(signUpPhoneNumberVerify.pending, () => {
                console.log(' --> pending');
            })
            .addCase(signUpPhoneNumberVerify.fulfilled, () => {
                console.log(' --> SignedIn successful.');
            })
            .addCase(signUpPhoneNumberVerify.rejected, () => {
                console.log(' --> SignedIn Unsuccessful');
            })

    }
})

export const { updateVerificationId } = firebaseSlice.actions

export default firebaseSlice.reducer