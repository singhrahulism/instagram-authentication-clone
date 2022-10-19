import React, { useState, useEffect } from 'react'
import { Text, View, StatusBar, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { CHANGE_LOADING } from '../../redux/features/loadingSlice'

import PrimaryButton from '../../components/buttons/PrimaryButton'

import NewSignUp from '../../components/footers/auth/NewSignUp'

import LoginWithFacebook from '../../components/loginMethods/LoginWithFacebook'
import SecondaryButton from '../../components/buttons/SecondaryButton'
import PhoneNumberVerify from '../../components/redux/PhoneNumberVerify'
import PhoneNumberField from '../../components/fields/PhoneNumberField'

const LoginPhoneScreen = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const isLoading = useSelector(state => state.loading.value)
    const verificationId = useSelector(state => state.firebaseStore.phoneAuth.verificationId)

    const handlePhoneNumber = (number) => {
        if(isPressed)
        {
            setIsPressed(false)
        }
        if(number.length <= 10 && ( number === '' || /^(0|[0-9][0-9]*)$/.test(number)))
        {
            setIsValid(true)
            setPhoneNumber(number)
        }
    }

    const handleModalPress = () => {
        setIsModalVisible(isModalVisible ? false : true)
    }

    const handlePress = () => {
        if(phoneNumber.length != 10)
        {
            setIsValid(false)
        }
        else
        {
            setIsPressed(true)
            dispatch(CHANGE_LOADING(true))
        }
    }

    useEffect(() => {
        if(verificationId)
        {
            dispatch(CHANGE_LOADING(false))
            setIsPressed(false)
            // console.log({verificationId});
            navigation.navigate('OTPVerification', { phoneNumber: phoneNumber, actionType: 'login' })
        }
    }, [verificationId])

    return <View style={styles.container}>
        <PhoneNumberVerify phoneNumber={phoneNumber} isPressed={isPressed} />
        <Image
            source={require('../../../assets/logo/mainLogo.png')}
            style={styles.imageContainer}
        />
        <View style={{height: 25}} />
        <PhoneNumberField
            onInputChange={number => handlePhoneNumber(number)}
            value={phoneNumber}
            validity={isValid}
        />
        {
            isValid
            ?   null
            :   <Text style={{color: 'red', alignSelf: 'flex-start', fontSize: 12, marginTop: 4}}>Invalid Parameters</Text>
        }
        <View style={{height: 10}} />
        <PrimaryButton
            text={'Get OTP'}
            allowed={phoneNumber}
            handlePress={handlePress}
            useIndicator={isLoading}
        />
        <SecondaryButton
            text={'Login using Email instead'}
            handlePress={() => navigation.navigate('LoginEmail')}
        />
        <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Text style={{color: '#a2a2a2', fontSize: 12}} >Forgotten your login details?&nbsp;</Text>
            <TouchableOpacity
                activeOpacity={0.65}
                onPress={handleModalPress}
            >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}} >Get help with logging in.</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.ORContainer}>
            <View style={styles.lineContainer} />
            <Text style={{color: '#a2a2a2', fontWeight: 'bold'}}>&nbsp;&nbsp;OR&nbsp;&nbsp;</Text>
            <View style={styles.lineContainer} />
        </View>

        <LoginWithFacebook />

        <NewSignUp />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'black',
        paddingHorizontal: 20
    },
    imageContainer: {
        height: '5%',
        width: 'auto',
        aspectRatio: 6042/1500
    },
    ORContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    lineContainer: {
        borderBottomColor: '#806e6c',
        borderBottomWidth: 1,
        flex: 1,
    }
})

export default LoginPhoneScreen ;