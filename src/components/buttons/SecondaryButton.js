import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const SecondaryButton = ({ handlePress, text }) => {
    return <TouchableOpacity
                style={styles.container}
                activeOpacity={0.65}
                onPress={handlePress}
            >
        <Text style={{color: '#0195f7'}}>{text ? text : 'Login'}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: 45,
        width: '100%',
        borderRadius: 4
    }
})

export default SecondaryButton ;