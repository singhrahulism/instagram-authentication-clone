import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseAuth from "../../../firebase/firebase";
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

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
        const userCredential = PhoneAuthProvider.credential(verificationId, otp)
        const response = await signInWithCredential(auth, userCredential)
        return response
    } catch (err) {
        return {errorCode: err.code}
    }
})

export const logInEmail = createAsyncThunk('firebase/logInEmail', async({email, password}) => {
    try
    {
        console.log('--> logging in using email & password');
        const auth = firebaseAuth.getAuth()
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password)
        return {user: userCredential.user}
    }
    catch(err)
    {
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
            .addCase(logInEmail.fulfilled, (state, action) => {
                console.log(' --> logInEmail fulfilled');
                if(action.payload.errorCode)
                {
                    console.log(action.payload.errorCode);
                    switch(action.payload.errorCode)
                    {
                        case 'auth/wrong-password':
                            state.error.errorBody = 'Incorrect Password. Please try again.'
                            break ;
                        case 'auth/user-not-found':
                            state.error.errorBody = 'Email address is not registered with us. Please try again with a different email address.'
                            break ;
                    }
                }
                if(action.payload.user)
                {
                    console.log(' * Signed in successful');
                    state.user = action.payload.user
                }
            })

    }
})

export const { updateVerificationId, updateErrorMessage } = firebaseSlice.actions

export default firebaseSlice.reducer