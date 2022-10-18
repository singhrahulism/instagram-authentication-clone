import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../components/buttons/PrimaryButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'

const WelcomeScreen = () => {

    const navigation = useNavigation()
    return <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
            hidden={false}
            translucent={true}
        />
        <Image
            source={require('../../../assets/logo/mainLogo.png')}
            style={styles.imageContainer}
        />
        <View style={{height: 70}} />
        <PrimaryButton text={'Create New Account'} handlePress={() => navigation.navigate('SignupPhone')} allowed={true} />
        <SecondaryButton handlePress={() => navigation.navigate('LoginEmail')} />
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
    }
})

export default WelcomeScreen ;