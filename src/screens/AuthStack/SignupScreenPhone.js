import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { CHANGE_LOADING } from '../../redux/features/loadingSlice';
import { useDispatch, useSelector } from 'react-redux'

import AlreadyLogIn from '../../components/footers/auth/AlreadyLogIn';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PhoneNumberField from '../../components/fields/PhoneNumberField';

import PhoneNumberVerify from '../../components/redux/PhoneNumberVerify';

const SignupScreenPhone = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [isPressed, setIsPressed] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)
    const verificationId = useSelector(state => state.firebaseStore.phoneAuth.verificationId)

    const handlePhoneNumberInput = ( number ) => {
        if(isPressed)
        {
            setIsPressed(false)
        }
        if(number.length <= 10 && ( number === '' || /^(0|[1-9][0-9]*)$/.test(number)))
        {
            setPhoneNumber(number)
        }
    }

    const handlePress = async () => {
        if(phoneNumber.length != 10)
        {
            setIsValid(false)
        }
        else
        {
            setIsValid(true)
            setIsPressed(true)
            dispatch(CHANGE_LOADING(true))
        }
    }
    
    useEffect(() => {
        if(verificationId)
        {
            dispatch(CHANGE_LOADING(false))
            setIsPressed(false)
            navigation.navigate('OTPVerification', { phoneNumber: phoneNumber, actionType: 'signup' })
        }
    }, [verificationId])

    return <View style={styles.container}>
        <PhoneNumberVerify phoneNumber={phoneNumber} isPressed={isPressed} />
        <StatusBar
            barStyle="light-content"
            hidden={false}
            translucent={true}
        />
        <View style={styles.userIconContainer}>
            <Feather name="user" size={100} color="white" />
        </View>
        <View style={styles.tabContainer}>
            <View style={{ ...styles.subTabContainer, borderBottomColor: 'white', borderWidth: 2 }}>
                <Text style={{color: 'white'}}>PHONE NUMBER</Text>
            </View>
            <TouchableOpacity
                style={{ ...styles.subTabContainer, borderBottomColor: 'grey', borderWidth: 1 }}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('SignupEmail')}
            >
            <Text style={{color: 'white'}}>EMAIL ADDRESS</Text>
            </TouchableOpacity>
        </View>
        <PhoneNumberField
            onInputChange={number => handlePhoneNumberInput(number)}
            value={phoneNumber}
            validity={isValid}
        />
        {
            isValid
            ?   null
            :   <Text style={{color: 'red', alignSelf: 'flex-start', fontSize: 12, marginTop: 4}}>Invalid Parameters</Text>
        }
        <Text style={styles.noticeContainer}>You may receive SMS notifications from us for security and login purposes.</Text>
        <PrimaryButton
            text={'Next'}
            handlePress={() => {
                phoneNumber
                ? handlePress()
                : null
            }}
            allowed={ phoneNumber ? true : false }
            useIndicator={isLoading}
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
        paddingHorizontal: 20
    },
    userIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 100
    },
    tabContainer: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    subTabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 50
    },
    noticeContainer: {
        color: '#a5a5a5',
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'center',
        marginVertical: 10
    }
})

export default SignupScreenPhone ;