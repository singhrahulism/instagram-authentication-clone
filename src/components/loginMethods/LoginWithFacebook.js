import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

import AlertModal from '../modals/AlertModal'

const LoginWithFacebook = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleFacebookLogin = () => {
        setErrorMessage('Still working on it, man. Just wait for sometime.')
        setIsModalVisible(true)
    }

    const handleIsModalVisible = () => {
        if(isModalVisible)
        {
            setIsModalVisible(false)
            setErrorMessage('')
        }
    }

    return <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8}
                onPress={handleFacebookLogin}
            >
        <AlertModal
            title={'Error'}
            message={errorMessage}
            modalVisible={isModalVisible}
            requestClose={handleIsModalVisible}
        />
        <FontAwesome5 name="facebook" size={24} color="#0195f7" />
        <Text style={{color: '#0195f7'}}>
            &nbsp;Log In With Facebook
        </Text>

    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25
    }
})

export default LoginWithFacebook ;