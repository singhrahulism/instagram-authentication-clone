import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebaseAuth from '../../firebase/firebase';
import firebaseConfig from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { updateVerificationId } from '../../redux/features/firebase/firebaseSlice';
import { CHANGE_LOADING } from '../../redux/features/loadingSlice';
import AlertModal from '../modals/AlertModal';

const PhoneNumberVerify = ({ phoneNumber, isPressed }) => {

    const recaptchaRef = useRef(null)
    const [verificationId, setVerificationId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()

    const handlePress = async() => {
        try
        {
            setErrorMessage('')
            const auth = firebaseAuth.getAuth()
            const validPhoneNumber = '+91'+phoneNumber
            const phoneProvider = new firebaseAuth.PhoneAuthProvider(auth);
            const newVerificationId = await phoneProvider.verifyPhoneNumber(
                validPhoneNumber,
                recaptchaRef.current
                );
            setVerificationId(newVerificationId)
        } catch(err) {
            setIsModalVisible(true)
            switch(err.code)
            {
                case 'auth/too-many-requests': setErrorMessage('Too many signup attempts. Please try again after sometime.')
                break ;
            }
            console.log(err);
            console.log(err.code);
        }
        dispatch(CHANGE_LOADING(false))
    }
    
    useEffect(() => {
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
        <AlertModal
            title={'Error'}
            message={errorMessage}
            modalVisible={isModalVisible}
            requestClose={() => setIsModalVisible(false)}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
    
    }
})

export default PhoneNumberVerify ;