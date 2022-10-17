import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

const PhoneNumberField = ({ onInputChange, value, validity }) => {
    return <View style={{...styles.container, borderColor: validity ? null : 'red', borderWidth: validity ? null : 2}}>
        <Text style={styles.countryCodeContainer}>IN +91</Text>
        <TextInput
            style={styles.inputContainer}
            placeholder='Phone Number'
            value={value}
            placeholderTextColor={'#a2a2a2'}
            color={'#a2a2a2'}
            keyboardType={'numeric'}
            onChangeText={t => {onInputChange(t)}}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636',
        width: '100%',
        borderRadius: 3,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    countryCodeContainer: {
        color: '#a2a2a2',
        borderRightColor: '#262626',
        borderRightWidth: 1,
        paddingRight: 15
    },
    inputContainer: {
        paddingLeft: 15,
        flex: 1,
    }
})

export default PhoneNumberField ;