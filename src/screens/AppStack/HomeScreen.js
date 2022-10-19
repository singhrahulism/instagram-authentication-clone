import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser } from '../../redux/features/firebase/firebaseSlice'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { CHANGE_LOADING } from '../../redux/features/loadingSlice'
import AlertModal from '../../components/modals/AlertModal'

const HomeScreen = () => {

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.loading.value)

    const handleSignOut = () => {
        console.log('singing out...')
        dispatch(CHANGE_LOADING(true))
        dispatch(signOutUser())
        .then(() => {
            setMessage('You are successfully logged out!')
            dispatch(CHANGE_LOADING(false))
        })
    }

    const handleRequestClose = () => {
        setMessage('')
    }

    const handleInsta = () => {
        Linking.openURL('instagram://user?username=raowlsingh')
    }

    return <View style={styles.container}>
        <AlertModal
            title={'Success'}
            message={message}
            modalVisible={message ? true : false}
            requestClose={handleRequestClose}
        />
        <Text style={styles.textStyle}>How about following me 😏?</Text>
        <TouchableOpacity
            style={styles.instaContainer}
            activeOpacity={0.8}
            onPress={handleInsta}
        >
        <Image
            source={require('../../../assets/logo/instaQR.png')}
            style={styles.imageContainer}
        />
        </TouchableOpacity>

        <View style={styles.ORContainer}>
            <View style={styles.lineContainer} />
            <Text style={{color: '#a2a2a2', fontWeight: 'bold'}}>&nbsp;&nbsp;OR&nbsp;&nbsp;</Text>
            <View style={styles.lineContainer} />
        </View>

        <PrimaryButton
            text={'Log Out'}
            allowed={true}
            useIndicator={isLoading}
            handlePress={handleSignOut}
        />
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
        height: '100%',
        width: 'auto',
        aspectRatio: 1079/1080,
        borderRadius: 10
    },
    textStyle: {
        color: 'white',
        fontSize: 25,
        marginVertical: 20
    },
    instaContainer: {
        height: Dimensions.get('window').width-40,
        width: Dimensions.get('window').width-40,
        marginVertical: 30
    },
    ORContainer: {
        marginBottom: 20,
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

export default HomeScreen ;