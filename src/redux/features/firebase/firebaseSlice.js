import React, { useRef } from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseAuth from "../../../firebase/firebase";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import firebaseConfig from '../../../firebase/firebaseConfig';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const recaptchaVerifier = useRef(null);
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

export const signUpEmail = createAsyncThunk('firebase/signUpEmail', async({email, password}) => {
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

export const signUpPhoneNumber = createAsyncThunk('firebase/signUpPhoneNumber', async({phoneNumber}) => {
    console.log(' --> Inside this shit...');
    <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
    />
    try
    {
        const auth = firebaseAuth.getAuth()
        const phoneProvider = new PhoneAuthProvider(auth)
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
        )
        console.log({verificationId});
        return verificationId
    }
    catch(err)
    {
        console.log('--- firebase error start ---');
        console.log(err.message)
        console.log('--- firebase error end ---');
    }
})

export const signUpPhoneNumberVerify = createAsyncThunk('firebase/signUpPhoneNumberVerify', async({verificatinoCode}) => {
    try
    {
        const auth = firebaseAuth.getAuth()
        const credential = PhoneAuthProvider.credential(initialState.phoneAuth.verificationId, verificatinoCode)
        await signInWithCredential(auth, credential)
    }
    catch(err)
    {
        alert(err.message)
    }
})


const firebaseSlice = createSlice({
    name: 'firebase',
    initialState,
    reducers: {
        
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
            .addCase(signUpPhoneNumber.pending, () => {
                console.log(' --> inside signUpPhone pending');
            })
            .addCase(signUpPhoneNumber.fulfilled, (state, action) => {
                console.log(' --> inside signUpPhone fulfilled');
                state.phoneAuth.verificationId = action.payload
            })
            .addCase(signUpPhoneNumber.rejected, () => {
                console.log(' --> inside signUpPhone rejected');
            })
    }
})

export const { SIGN_UP_EMAIL, SIGN_UP_EMAIL_VERIFICATION } = firebaseSlice.actions

export default firebaseSlice.reducer