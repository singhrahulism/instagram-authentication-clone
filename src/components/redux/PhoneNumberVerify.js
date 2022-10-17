import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebaseAuth from '../../firebase/firebase';
import firebaseConfig from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { updateVerificationId } from '../../redux/features/firebase/firebaseSlice';

const PhoneNumberVerify = ({ phoneNumber, isPressed }) => {

    const recaptchaRef = useRef(null)
    const [verificationId, setVerificationId] = useState('')

    const dispatch = useDispatch()
    const handlePress = async() => {
        // console.log('-> Check PNV 1');
        const validPhoneNumber = '+91'+phoneNumber
        const auth = firebaseAuth.getAuth()
        // console.log('-> Check PNV 2');
        const phoneProvider = new firebaseAuth.PhoneAuthProvider(auth);
        // console.log('-> Check PNV 3');
        const newVerificationId = await phoneProvider.verifyPhoneNumber(
            validPhoneNumber,
            recaptchaRef.current
            );
        setVerificationId(newVerificationId)
        // console.log('-> Check PNV 4');
    }
    
    useEffect(() => {
        // console.log(`phoneNumberLength: ${phoneNumber.length}`);
        // console.log(`isPressed: ${isPressed}`);
        if(phoneNumber.length === 10 && isPressed === true)
        {
            handlePress()
        }
    }, [phoneNumber, isPressed])

    useEffect(() => {
        if(verificationId)
        {
            console.log('--> Changing verification ID state');
            dispatch(updateVerificationId({verificationId}))
        }
    }, [verificationId])

    return <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
                ref={recaptchaRef}
                firebaseConfig={firebaseConfig}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
    
    }
})

export default PhoneNumberVerify ;