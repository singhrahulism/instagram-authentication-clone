import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const AlreadyLogIn = () => {

    const navigation = useNavigation()

    return <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#888888', fontSize: 12}}>
                Already have an account?&nbsp;
            </Text>
            <TouchableOpacity
                activeOpacity={0.65}
                onPress={() => navigation.navigate('LoginEmail')}
            >
                <Text style={{color: '#dbe8f4', fontSize: 12}}>Log in.</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '110%',
        justifyContent :'center',
        alignItems: 'center',
        marginHorizontal: 0,
        paddingVertical: 15,
        borderTopColor: '#262626',
        borderTopWidth: 1
    }
})

export default AlreadyLogIn ;