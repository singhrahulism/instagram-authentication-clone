import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { signUpPhoneNumber } from '../../redux/features/firebase/firebaseSlice'
import { CHANGE_LOADING } from '../../redux/features/loadingSlice';
import { useDispatch, useSelector } from 'react-redux'

import AlreadyLogIn from '../../components/footers/auth/AlreadyLogIn';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PhoneNumberField from '../../components/fields/PhoneNumberField';

const SignupScreenPhone = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isValid, setIsValid] = useState(true)
    
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)

    const handlePhoneNumberInput = ( number ) => {
        setIsValid(true)
        if(number.length <= 10 && ( number === '' || /^(0|[1-9][0-9]*)$/.test(number)))
        {
            setPhoneNumber(number)
        }
    }

    const handlePress = () => {
        if(phoneNumber.length != 10)
        {
            setIsValid(false)
        }
        else
        {
            setIsValid(true)
            // alert('Phone number is valid')
            console.log('--> Accessing signUpPhoneNumber()');
            dispatch(CHANGE_LOADING(true))
            dispatch(signUpPhoneNumber({phoneNumber}))
            .then(() => {
                console.log('dispatching change_loading');
                dispatch(CHANGE_LOADING(false))
            })
        }
        // console.log(isValid);
    }

    return <View style={styles.container}>
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