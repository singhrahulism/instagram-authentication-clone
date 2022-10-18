import React, { useState } from 'react'
import { Text, View, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../components/buttons/PrimaryButton'
import UserPhoneEmailField from '../../components/fields/Login/UserPhoneEmailField'

import NewSignUp from '../../components/footers/auth/NewSignUp'
import AlertModal from '../../components/modals/AlertModal'

import LoginWithFacebook from '../../components/loginMethods/LoginWithFacebook'
import SecondaryButton from '../../components/buttons/SecondaryButton'
import PhoneNumberVerify from '../../components/redux/PhoneNumberVerify'
import PhoneNumberField from '../../components/fields/PhoneNumberField'

const LoginPhoneScreen = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const navigation = useNavigation()

    const handlePhoneNumber = (number) => {
        setIsValid(true)
        if(isPressed)
        {
            setIsPressed(false)
        }
        if(number.length <= 10 && ( number === '' || /^(0|[0-9][0-9]*)$/.test(number)))
        {
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
            alert('Phone number is okay.')
            // setIsPressed(true)
            // dispatch(CHANGE_LOADING(true))
        }
    }
    
    return <View style={styles.container}>
        {/* <PhoneNumberVerify
            
        /> */}
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
        <View style={{height: 10}} />
        {
            isValid
            ?   null
            :   <Text style={{color: 'red', alignSelf: 'flex-start', fontSize: 12, marginTop: 4}}>Invalid Parameters</Text>
        }
        <PrimaryButton
            text={'Log In'}
            allowed={phoneNumber}
            handlePress={handlePress}
        />
        <SecondaryButton
            text={'Login using Email instead'}
            handlePress={() => navigation.navigate('LoginEmail')}
        />
        <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Text style={{color: '#a2a2a2', fontSize: 12}} >Forgotten your login details?&nbsp;</Text>
            <AlertModal
                title={'Unsupported Feature'}
                message={'Sorry, currently this feature is not supported.'}
                modalVisible={isModalVisible}
                requestClose={() => setIsModalVisible(false)}
            />
            <TouchableOpacity
                activeOpacity={0.65}
                // onPress={() => alert('Currently, this feature is NOT supported.')}
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