import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'

const HomeScreen = () => {

    const user = useSelector(state => state.firebaseStore.user)
    console.log(user.providerData);
    return <View style={styles.container}>
        {/* <Text>uid: {user.providerData}</Text> */}
    </View>
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default HomeScreen ;