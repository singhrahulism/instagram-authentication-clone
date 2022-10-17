import React, { useState } from 'react'
import { Text, View, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../components/buttons/PrimaryButton'
import UserPhoneEmailField from '../../components/fields/Login/UserPhoneEmailField'
import PasswordField from '../../components/fields/Login/PasswordField'

import NewSignUp from '../../components/footers/auth/NewSignUp'
import AlertModal from '../../components/modals/AlertModal'

import LoginWithFacebook from '../../components/loginMethods/LoginWithFacebook'
import SecondaryButton from '../../components/buttons/SecondaryButton'

const LoginEmailScreen = () => {

    const [userPhoneEmail, setUserPhoneEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const navigation = useNavigation()

    const handleUserPhoneEmailField = (updatedText) => {
        setUserPhoneEmail(updatedText)
    }

    const handlePassword = (updatedPass) => {
        setPassword(updatedPass)
    }

    const handleModalPress = () => {
        setIsModalVisible(isModalVisible ? false : true)
    }
    
    return <View style={styles.container}>
        <Image
            source={require('../../../assets/logo/mainLogo.png')}
            style={styles.imageContainer}
        />
        <View style={{height: 25}} />
        <UserPhoneEmailField
            onInputChange={(updatedText) => handleUserPhoneEmailField(updatedText)}
            placeHolderText={'Phone number, email address or username'}
            value={userPhoneEmail}
            />
        <PasswordField
            onInputChange={(updatedPass) => handlePassword(updatedPass)}
            placeHolderText={'Password'}
            value={password}
        />
        <PrimaryButton text={'Log In'} />
        <SecondaryButton
            text={'Login using Phone Number instead'}
            handlePress={() => navigation.navigate('LoginPhone')}
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

export default LoginEmailScreen ;