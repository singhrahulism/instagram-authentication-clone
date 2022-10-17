import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons';

const LoginWithFacebook = () => {
    return <TouchableOpacity style={styles.container} activeOpacity={0.8} >
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