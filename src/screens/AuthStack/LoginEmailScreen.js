import React, { useState, useEffect } from 'react'
import { Text, View, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../components/buttons/PrimaryButton'
import EmailField from '../../components/fields/EmailField'
import PasswordField from '../../components/fields/Login/PasswordField'

import NewSignUp from '../../components/footers/auth/NewSignUp'
import AlertModal from '../../components/modals/AlertModal'

import LoginWithFacebook from '../../components/loginMethods/LoginWithFacebook'
import SecondaryButton from '../../components/buttons/SecondaryButton'

import { logInEmail, updateErrorMessage } from '../../redux/features/firebase/firebaseSlice'
import { CHANGE_LOADING } from '../../redux/features/loadingSlice';
import { useDispatch, useSelector } from 'react-redux'

const LoginEmailScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)
    const errorMessage = useSelector(state => state.firebaseStore.error.errorBody)

    const handleEmailInput = (mail) => {
        setIsValid(true)
        setEmail(mail)
    }

    const handlePassword = (pass) => {
        setPassword(pass)
    }

    const handleIsModalVisible = () => {
        if(isModalVisible)
        {
            setIsModalVisible(false)
            dispatch(updateErrorMessage(''))
        }
        else
        {
            setIsModalVisible(true)
        }
    }

    const handlePress = ( mail ) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(reg.test(mail) === true)
        {
            setIsValid(true)
            setEmail(mail)
            dispatch(CHANGE_LOADING(true))
            dispatch(updateErrorMessage(''))
            dispatch(logInEmail({email, password}))
            .then(() => {
                dispatch(CHANGE_LOADING(false))
            })
        } else {
            setIsValid(false)
        }
    }

    useEffect(() => {
        if(errorMessage)
        {
            setIsModalVisible(true)
        }
    }, [errorMessage])
    
    return <View style={styles.container}>
        <AlertModal
            title={'Error'}
            message={errorMessage}
            modalVisible={isModalVisible}
            requestClose={handleIsModalVisible}
        />
        <Image
            source={require('../../../assets/logo/mainLogo.png')}
            style={styles.imageContainer}
        />
        <View style={{height: 25}} />
        <EmailField
            onInputChange={mail => handleEmailInput(mail)}
            value={email}
            validity={isValid}
        />
        {
            isValid
            ?   null
            :   <Text style={{color: 'red', alignSelf: 'flex-start', fontSize: 12, marginTop: -7, marginBottom: 10}}>
                Please enter a valid email address.
                </Text>
        }
        <PasswordField
            onInputChange={updatedPass => handlePassword(updatedPass)}
            placeHolderText={'Password'}
            value={password}
        />
        <PrimaryButton
            text={'Next'}
            handlePress={() => {
                email && password.length >= 6
                ? handlePress(email)
                : null
            }}
            allowed={ email && password.length >= 6 ? true : false }
            useIndicator={isLoading}
        />
        <SecondaryButton
            text={'Login using Phone Number instead'}
            handlePress={() => navigation.navigate('LoginPhone')}
        />
        <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Text style={{color: '#a2a2a2', fontSize: 12}} >Forgotten your login details?&nbsp;</Text>
            <TouchableOpacity
                activeOpacity={0.65}
                onPress={() => {
                    dispatch(updateErrorMessage('Sorry. Currently this feature is NOT supported.'))
                }}
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

export default LoginEmailScreen ;