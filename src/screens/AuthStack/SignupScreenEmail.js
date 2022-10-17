import React, { useDeferredValue, useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { SIGN_UP_EMAIL, signUpEmail } from '../../redux/features/firebase/firebaseSlice'
import { CHANGE_LOADING } from '../../redux/features/loadingSlice';
import { useDispatch, useSelector } from 'react-redux'

import AlreadyLogIn from '../../components/footers/auth/AlreadyLogIn';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import EmailField from '../../components/fields/EmailField';
import PasswordField from '../../components/fields/Login/PasswordField';
import AlertModal from '../../components/modals/AlertModal';


const SignupScreenEmail = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(true)
    
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)
    const signUpStatus = useSelector(state => state.firebaseStore.error.errorOccured)

    const handleEmailInput = (mail) => {
        setIsValid(true)
        setEmail(mail)
    }

    const handlePassword = (pass) => {
        setPassword(pass)
    }
    const handlePress = ( mail ) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(reg.test(mail) === true)
        {
            setIsValid(true)
            setEmail(mail)
            dispatch(CHANGE_LOADING(true))
            dispatch(signUpEmail({email, password}))
            .then(() => {
                console.log('dispatching change_loading');
                dispatch(CHANGE_LOADING(false))
            })
        } else {
            setIsValid(false)
        }
    }

    useEffect(() => {
        console.log(`signUpStatus: ${signUpStatus}`);
    })

    // useEffect(() => {
    //     console.log('here');
    //     {
    //         errorOccured === false &&
    //         <AlertModal
    //             title={errorMain}
    //             message={errorBody}
    //             modalVisible={true}
    //         />
    //     }
    // }, [errorOccured])

    return <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
            hidden={false}
            translucent={true}
        />
        <View style={styles.userIconContainer}>
            <Feather name="user" size={100} color="white" />
        </View>
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={{ ...styles.subTabContainer, borderBottomColor: 'grey', borderWidth: 1 }}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('SignupPhone')}
            >
                <Text style={{color: 'white'}}>PHONE NUMBER</Text>
            </TouchableOpacity>
            <View style={{ ...styles.subTabContainer, borderBottomColor: 'white', borderWidth: 2 }}>
                <Text style={{color: 'white'}}>EMAIL ADDRESS</Text>
            </View>
        </View>
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
        <AlreadyLogIn />
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
    userIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 100
    },
    tabContainer: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    subTabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 50
    }
})

export default SignupScreenEmail ;