import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ onInputChange, placeHolderText, value }) => {

    const [passwordVisible, setPasswordVisible] = useState(true)

    return <View style={styles.container}>
        <TextInput
            style={styles.inputContainer}
            placeholder={placeHolderText}
            value={value}
            secureTextEntry={passwordVisible}
            placeholderTextColor={'#a2a2a2'}
            color={'#a2a2a2'}
            onChangeText={t => {onInputChange(t)}}
        />
        <TouchableOpacity
            style={styles.iconContainer}
            activeOpacity={0.65}
            onPress={() => setPasswordVisible(!passwordVisible)}
        >
            <Ionicons
                name={passwordVisible ? 'ios-eye-off' : 'ios-eye'}
                size={20}
                color={passwordVisible ? '#a2a2a2' : '#0195f7'}
            />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 3,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 7,
    },
    inputContainer: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 40,
        width: 40,
        right: 5
    }
})

export default PasswordField ;