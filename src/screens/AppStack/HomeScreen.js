import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

import { useDispatch } from 'react-redux'
import { signOutUser } from '../../redux/features/firebase/firebaseSlice'

const HomeScreen = () => {

    const dispatch = useDispatch()

    return <View style={styles.container}>
        <Button
            title='Log out'
            onPress={() => {
            console.log('singing out...')
            dispatch(signOutUser())
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default HomeScreen ;