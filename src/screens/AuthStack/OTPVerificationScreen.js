import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import GeneralField from '../../../src/components/fields/GeneralField'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import AlreadyLogIn from '../../components/footers/auth/AlreadyLogIn'
import { useDispatch, useSelector } from 'react-redux'
import { signUpPhoneNumberVerify } from '../../redux/features/firebase/firebaseSlice'

const OTPVerificationScreen = ({ phoneNumber='9990087279' }) => {

    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const verificationId = useSelector(state => state.firebaseStore.phoneAuth.verificationId)

    const handleOtp = (newOtp) => {
        if(newOtp.length <= 6 && ( newOtp === '' || /^(0|[1-9][0-9]*)$/.test(newOtp)))
        {
            setOtp(newOtp)
        }
    }

    const handlePress = () => {
        console.log('--> Pressed');
        dispatch(signUpPhoneNumberVerify({verificationId, otp}))
    }

    // useEffect(() => {
    //     console.log({otp});
    // }, [otp])

    return <View style={styles.container}>
        <Text style={styles.textContainer}>Enter the confirmation code that we sent to +91 {phoneNumber}</Text>
        <GeneralField
            placeHolderText={'123456'}
            keyboardType={'numeric'}
            value={otp}
            onInputChange={newOtp => handleOtp(newOtp)}
        />
        <PrimaryButton
            text={'Verify'}
            allowed={otp.length}
            handlePress={handlePress}
        />
        <AlreadyLogIn />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'black',
        paddingHorizontal: 25
    },
    textContainer: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 20
    }
})

export default OTPVerificationScreen ;