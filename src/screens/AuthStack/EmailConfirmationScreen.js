import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native'

import { SIGN_UP_EMAIL, SIGN_UP_EMAIL_VERIFICATION } from '../../redux/features/firebase/firebaseSlice'
import { useDispatch } from 'react-redux'

import PrimaryButton from '../../components/buttons/PrimaryButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'

const EmailConfirmationScreen = ({ route }) => {

    const {email, password} = route.params

    const dispatch = useDispatch()

    const handlePressStatus = () => {
        alert('Status Pressed')
    }
    
    const handlePressConfirmation = () => {
        alert('Confirmation Pressed')
    }

    useEffect(() => {
        dispatch(SIGN_UP_EMAIL({
            email: email,
            password: password
        }))
        
        dispatch(SIGN_UP_EMAIL_VERIFICATION())

    }, [])

    return <View style={styles.container}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>VERIFY YOUR EMAIL ACCOUNT</Text>
        <Text style={{color: 'white', marginHorizontal: 20, textAlign: 'center', marginVertical: 30  , fontSize: 12}}>
            We have sent an email verification link to {email} to verify your email and activate your account.
        </Text>
        <SecondaryButton
            text={'Send confirmation link again'}
            handlePress={handlePressConfirmation}
        />
        <PrimaryButton
            text={'Check Status'}
            handlePress={handlePressStatus}
            allowed={true}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight+50,
        backgroundColor: 'black',
        paddingHorizontal: 20
    }
})

export default EmailConfirmationScreen ;